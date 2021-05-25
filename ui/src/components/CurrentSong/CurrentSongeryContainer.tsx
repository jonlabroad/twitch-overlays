import React from "react"
import { StreamerSongListContainer } from "../StreamerSongListContainer"
import { CurrentSongery } from "./CurrentSongery"

export interface CurrentSongeryContainerProps {

}

export const CurrentSongeryContainer = (props: CurrentSongeryContainerProps) => {
    return <StreamerSongListContainer>
        <CurrentSongery />
    </StreamerSongListContainer>
}