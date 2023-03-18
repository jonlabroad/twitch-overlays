import { useEffect, useRef, useState } from "react";
import { StreamElementsMessageEvent } from "../util/StreamElementsTypes";
import { ChatMessage } from "../chat/ChatMessage";

export function useStreamElementsTwitchChat() {
  const [currentMessage, setCurrentMessage] = useState<any | undefined>(
    undefined
  );
  const messageQueue = useRef<any[]>([]);

  useEffect(() => {
    window.addEventListener("message", function (event: any) {
      console.log({ event });
      if (event.type === "onEventReceived") {
        if (event.obj?.detail?.listener === "message") {
          const ev = event.obj.detail.event.data as StreamElementsMessageEvent;
          const chatMessage: ChatMessage = {
            userId: ev.userId,
            username: ev.displayName,
            displayName: ev.displayName,
            isMod: ev.badges.some((badge) => badge.type === "mod"),
            isVip: ev.badges.some((badge) => badge.type === "vip"),
            message: ev.text,
            timestamp: new Date(ev.time),
          };
          messageQueue.current.push(chatMessage);
        }
        if (!currentMessage) {
          popMessage();
        }
      }
    });

    window.addEventListener("onWidgetLoad", function (obj) {
      console.log("AT LEAST WE GOT HERE!!!");
    });
  }, []);

  function popMessage() {
    setCurrentMessage(messageQueue.current.shift());
  }

  return [currentMessage, popMessage];
}
