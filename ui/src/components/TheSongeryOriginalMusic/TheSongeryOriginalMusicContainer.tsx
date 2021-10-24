import React from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusic } from "./TheSongeryOriginalMusic"

export interface TheSongeryOriginalMusicContainerProps {

}

export const TheSongeryOriginalMusicContainer = (props: TheSongeryOriginalMusicContainerProps) => {
    return <StreamerSongListContainer>
        <TheSongeryOriginalMusic />
    </StreamerSongListContainer>
}