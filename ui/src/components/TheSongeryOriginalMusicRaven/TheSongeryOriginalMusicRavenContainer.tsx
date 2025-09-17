import React, { useEffect, useRef, useState } from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicBday } from "../TheSongeryOriginalMusicRavenBday/TheSongeryOriginalMusicBday";
import { TheSongeryOriginalMusicRaven } from "./TheSongeryOriginalMusicRaven"
import { TheSongeryOriginalMusicHalloweenContainer } from "../TheSongeryOriginalMusicRavenHalloween/TheSongeryOriginalMusicHalloweenContainer";

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

const isHalloweenPeriod = () => {
    const now = new Date();
    if ((now.getMonth() === 9 && now.getDate() >= 26) || (now.getMonth() === 10 && now.getDate() <= 1)) {
        return true;
    }
}

export const TheSongeryOriginalMusicRavenContainer = (props: TheSongeryOriginalMusicRavenContainerProps) => {
    const [isBday, setIsBday] = useState(isTodayBday() || isExtendedBday());
    const [isHalloween, setIsHalloween] = useState(isHalloweenPeriod());

    useEffect(() => {
        setInterval(() => {
            if (!isHalloween && isHalloweenPeriod()) {
                setIsHalloween(true);
            } else if (isHalloween && !isHalloweenPeriod()) {
                setIsHalloween(false);
            }

            if (!isBday && (isTodayBday() || isExtendedBday())) {
                setIsBday(true);
            } else if (isBday && !(isTodayBday() || isExtendedBday())) {
                setIsBday(false);
            }
        }, 10000)
    }, [])

    return <StreamerSongListContainer>
        {isBday ? <TheSongeryOriginalMusicBday /> :
        (
            isHalloween ? <TheSongeryOriginalMusicHalloweenContainer /> : <TheSongeryOriginalMusicRaven />
        )
        }
    </StreamerSongListContainer>
}