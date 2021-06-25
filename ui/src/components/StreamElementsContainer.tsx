import React, { createContext, useContext, useReducer } from "react"
import { useStreamElements } from "../hooks/streamElementsHooks";
import { useStreamerSongListEvents } from "../hooks/streamersonglistHooks";
import { songListStateReducer } from "../state/SongListReducer";
import { defaultSongListState, SongListState, SongListStateContextType } from "../state/SongListState";
import { defaultStreamElementsState, StreamElementsState, StreamElementsStateContextType } from "../state/StreamElementsState";
import { streamElementsStateReducer } from "../state/StreamElementsStateReducer";

export const StreamElementsStateContext = createContext<StreamElementsStateContextType>({
    dispatch: undefined,
    state: defaultStreamElementsState
});

export interface StreamElementsContainerProps {
    children: JSX.Element | JSX.Element[]
}

export const StreamElementsContainer = (props: StreamElementsContainerProps) => {
    const { children } = props;

    const [streamElementsState, streamElementsStateDispatch] = useReducer(streamElementsStateReducer, {
        ...defaultStreamElementsState
    } as StreamElementsState);

    useStreamElements(streamElementsStateDispatch);

    return <React.Fragment>
        <StreamElementsStateContext.Provider
            value={{
                state: streamElementsState,
                dispatch: streamElementsStateDispatch
            }}
        >
            {children}
        </StreamElementsStateContext.Provider>
    </React.Fragment>
}