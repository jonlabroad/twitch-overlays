import React, { createContext, useReducer } from "react"
import { useStreamerSongListEvents } from "../hooks/streamersonglistHooks";
import { songListStateReducer } from "../state/SongListReducer";
import { defaultSongListState, SongListState, SongListStateContextType } from "../state/SongListState";
import { useStreamer } from "../util/Query";

export const SongListStateContext = createContext<SongListStateContextType>({
    dispatch: undefined,
    state: defaultSongListState,
});

export interface StreamerSongListContainerProps {
    children: JSX.Element | JSX.Element[]
}

export const StreamerSongListContainer = (props: StreamerSongListContainerProps) => {
    const { children } = props;

    const [songListState, songListStateDispatch] = useReducer(songListStateReducer, {
        ...defaultSongListState,
    } as SongListState);

    const streamer = useStreamer() ?? "";

    useStreamerSongListEvents(streamer, songListStateDispatch);

    return <React.Fragment>
        <SongListStateContext.Provider
            value={{
                state: songListState,
                dispatch: songListStateDispatch,
            }}
        >
            {children}
        </SongListStateContext.Provider>
    </React.Fragment>
}