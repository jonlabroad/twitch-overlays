import React from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicBday } from "./TheSongeryOriginalMusicBday"

export interface TheSongeryOriginalMusicBdayContainerProps {

}

export const TheSongeryOriginalMusicBdayContainer = (props: TheSongeryOriginalMusicBdayContainerProps) => {
    return <StreamerSongListContainer>
        <TheSongeryOriginalMusicBday />
    </StreamerSongListContainer>
}