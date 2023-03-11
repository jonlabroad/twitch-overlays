import { useEffect, useRef, useState } from "react";
import * as tmi from "tmi.js"

export function useTwitchChat(channelName: string) {
    const [currentMessage, setCurrentMessage] = useState<any | undefined>(undefined)
    const messageQueue = useRef<any[]>([])

    const client = useRef(new tmi.Client({
        channels: [channelName]
    }))

    useEffect(() => {
        client.current.on("message", (channel, userstate, message) => {
            console.log({recv: {userstate, message}})
            messageQueue.current.push({
                channel,
                userstate,
                message,
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