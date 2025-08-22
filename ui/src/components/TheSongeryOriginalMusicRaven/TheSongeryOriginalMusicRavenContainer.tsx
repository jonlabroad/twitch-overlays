import React, { useEffect, useRef, useState } from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicBday } from "../TheSongeryOriginalMusicRavenBday/TheSongeryOriginalMusicBday";
import { TheSongeryOriginalMusicRaven } from "./TheSongeryOriginalMusicRaven"

export interface TheSongeryOriginalMusicRavenContainerProps {

}

const isExtendedBday = () => {
    const now = new Date();
    if (now.getMonth() === 7 && now.getDate() >= 20 && now.getDate() <= 24) {
        return true;
    }
}

const isTodayBday = () => {
    const now = new Date();
    if (now.getMonth() === 7 && now.getDate() === 20) {
        return true;
    }
    return false;
}

export const TheSongeryOriginalMusicRavenContainer = (props: TheSongeryOriginalMusicRavenContainerProps) => {
    const [isBday, setIsBday] = useState(isTodayBday() || isExtendedBday());

    useEffect(() => {
        setInterval(() => {
            if (!isBday && (isTodayBday() || isExtendedBday())) {
                setIsBday(true);
            } else if (isBday && !(isTodayBday() || isExtendedBday())) {
                setIsBday(false);
            }
        }, 10000)
    }, [])

    return <StreamerSongListContainer>
        {isBday ? <TheSongeryOriginalMusicBday /> : <TheSongeryOriginalMusicRaven />}
    </StreamerSongListContainer>
}