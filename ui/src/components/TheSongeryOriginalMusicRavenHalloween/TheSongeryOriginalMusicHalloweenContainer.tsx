import React from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicHalloween } from "./TheSongeryOriginalMusicHalloween"

export interface TheSongeryOriginalMusicHalloweenContainerProps {

}

export const TheSongeryOriginalMusicHalloweenContainer = (props: TheSongeryOriginalMusicHalloweenContainerProps) => {
    return <StreamerSongListContainer>
        <TheSongeryOriginalMusicHalloween />
    </StreamerSongListContainer>
}