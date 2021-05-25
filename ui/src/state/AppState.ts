import { GetQueueResponse } from "../service/StreamerSongListClient";

export interface AppStateSongListStateContextType {
    dispatch: any,
    state: AppState;
}

export const defaultSongListState: AppState = {
};

export interface AppState {
    songQueue?: GetQueueResponse;
}