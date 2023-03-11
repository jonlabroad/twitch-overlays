import { FlexRow } from "../../util/FlexBox";
import { BuddyListStatusIcon } from "./BuddyListStatusIcon";

export type UserStatus = "present" | "login" | "away" | "logout"

const stateToUserStyle: Record<UserStatus, any> = {
    "login": {
        fontWeight: "bold"
    },
    "logout": {
        fontStyle: "italic",
        color: "grey"
    },
    "away": {},
    "present": {}
}

export interface BuddyListUserProps {
    userName: string
    userStatus: UserStatus
}

export const BuddyListUser = (props: BuddyListUserProps) => {
    const { userStatus } = props;

    const userStyles: Record<string, any> = { fontSize: 14, ...stateToUserStyle[userStatus ?? "present"] }
    return (
        <FlexRow flexDirection="row" alignItems="center" marginLeft={30} marginTop={2} >
            <BuddyListStatusIcon status={userStatus}/>
            <div style={userStyles}>{props.userName}</div>
        </FlexRow>
    )
}
