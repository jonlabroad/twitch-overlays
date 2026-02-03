import React, { useEffect, useRef, useState } from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicBday } from "../TheSongeryOriginalMusicRavenBday/TheSongeryOriginalMusicBday";
import { TheSongeryOriginalMusicRaven } from "./TheSongeryOriginalMusicRaven"

export interface IProps {
}

const isTodayBday = () => {
    const now = new Date();
    if (now.getMonth() === 7 && now.getDate() === 20) {
        return true;
    }
    return false;
}

export const TheSongeryOriginalMusicRavenContainer = (props: IProps) => {
    const [isBday, setIsBday] = useState(isTodayBday());

    useEffect(() => {
        setInterval(() => {
            if (!isBday && isTodayBday()) {
                setIsBday(true);
            } else if (isBday && !isTodayBday()) {
                setIsBday(false);
            }
        }, 10000)
    }, [])

    return <StreamerSongListContainer>
        {isBday ? <TheSongeryOriginalMusicBday /> : <TheSongeryOriginalMusicRaven />}
    </StreamerSongListContainer>
}