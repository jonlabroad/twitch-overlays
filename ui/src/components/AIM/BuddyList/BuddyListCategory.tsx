import { FlexCol } from "../../util/FlexBox";
import { BuddyListCategoryHeader } from "./BuddyListCategoryHeader";
import { BuddyListUser, UserStatus } from "./BuddyListUser"

export interface BuddyListCategoryProps {
    name: string
    users: any[]
}

export const BuddyListCategory = (props: BuddyListCategoryProps) => {
    const { name, users } = props;

    return (
        <FlexCol style={{ marginTop: 3, marginLeft: 0, flexWrap: "wrap" }}>
            <BuddyListCategoryHeader
                label={name}
                numUsers={users.length}
            />
            <FlexCol style={{}}>
                {users.map(userstate => (
                    <BuddyListUser userName={userstate["display-name"]} userStatus={userstate.status ?? "present"} />
                ))}
            </FlexCol>
        </FlexCol>
    )
}
