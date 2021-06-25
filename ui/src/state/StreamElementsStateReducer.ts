import { FollowerEvent } from "../service/StreamElementsTypes";
import { StreamElementsState } from "./StreamElementsState";

export interface StreamElementsStateAction {
    type: "new_follower";
}

export interface NewFollowerAction extends StreamElementsStateAction {
    event: FollowerEvent;
}

export const streamElementsStateReducer = (state: StreamElementsState, rawAction: StreamElementsStateAction): StreamElementsState => {
    switch (rawAction.type) {
        case "new_follower": {
            const action = rawAction as NewFollowerAction;
            return {
                ...state,
                followers: {
                    ...state.followers,
                    follows: [...state.followers.follows, action.event]
                }
            };
        }
        default:
            console.error(`Do not know how to process ${rawAction.type}`);
    }
    return state;
}