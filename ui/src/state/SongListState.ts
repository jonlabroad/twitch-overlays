import { GetQueueResponse } from "../service/StreamerSongListClient";

export interface SongListStateContextType {
    dispatch: any,
    state: SongListState;
}

export const defaultSongListState: SongListState = {
};

export interface SongListState {
    songQueue?: GetQueueResponse;
}