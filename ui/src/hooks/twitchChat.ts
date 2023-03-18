import { useEffect, useRef, useState } from "react";
import * as tmi from "tmi.js"
import { ChatMessage } from "../chat/ChatMessage";

export function useTwitchChat(channelName: string): [ChatMessage | undefined, () => void] {
    const [currentMessage, setCurrentMessage] = useState<ChatMessage | undefined>(undefined)
    const messageQueue = useRef<ChatMessage[]>([])

    const client = useRef(new tmi.Client({
        channels: [channelName]
    }))

    useEffect(() => {
        client.current.on("message", (channel, userstate, message) => {
            console.log({recv: {userstate, message}})
            messageQueue.current.push({
                userId: userstate["user-id"] ?? "",
                username: userstate.username ?? "",
                displayName: userstate["display-name"] ?? "",
                isMod: userstate.mod ?? false,
                isVip: userstate.vip ?? false,
                message: message,
                timestamp: new Date()
            })
            if (!currentMessage) {
                popMessage()
            }
        })
        client.current.on("connected", (address, port) => {
            console.log({connected: {address, port}})
        })
        client.current.connect()
    }, [])

    function popMessage() {
        setCurrentMessage(messageQueue.current.shift())
    }

    return [currentMessage, popMessage]
}