import React from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { TheSongeryOriginalMusicRaven } from "./TheSongeryOriginalMusicRaven"

export interface TheSongeryOriginalMusicRavenContainerProps {

}

export const TheSongeryOriginalMusicRavenContainer = (props: TheSongeryOriginalMusicRavenContainerProps) => {
    return <StreamerSongListContainer>
        <TheSongeryOriginalMusicRaven />
    </StreamerSongListContainer>
}