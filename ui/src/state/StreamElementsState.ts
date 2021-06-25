import { FollowerEvent } from "../service/StreamElementsTypes";

export interface StreamElementsStateContextType {
    dispatch: any,
    state: StreamElementsState;
}

export interface FollowerState {
    follows: FollowerEvent[]
}

export const defaultStreamElementsState: StreamElementsState = {
    followers: {
        follows: []
    }
};

export interface StreamElementsState {
    followers: FollowerState;
}