import { GetQueueResponse } from "../service/StreamerSongListClient";
import { SongListState } from "./SongListState";

export interface SongListStateAction {
    type: "update_songqueue";
}

export interface UpdateSongQueueAction extends SongListStateAction {
    queue: GetQueueResponse;
}

export const songListStateReducer = (state: SongListState, action: SongListStateAction): SongListState => {
    switch (action.type) {
        case "update_songqueue": {
            const updateQueue = action as UpdateSongQueueAction;
            return {
                ...state,
                songQueue: updateQueue.queue,
            };
        }
        default:
            console.error(`Do not know how to process ${action.type}`);
    }
    return state;
}