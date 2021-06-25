import React, { useContext } from "react"
import { StreamElementsContainer, StreamElementsStateContext } from "../StreamElementsContainer";
import { HoagieFollowerAlert } from "./HoagieFollowerAlert"

export interface HoagieFollowerAlertContainerProps {

}

export const HoagieFollowerAlertContainer = (props: HoagieFollowerAlertContainerProps) => {
    return <StreamElementsContainer>
        <HoagieFollowerAlert />
    </StreamElementsContainer>
}