import { FlexCol, FlexRow } from "../../util/FlexBox"
import { BuddyListCategory } from "./BuddyListCategory"

export interface TestProps {
    userList: Record<string, any>
}

export const Test = (props: TestProps) => {
    const childStyle = {
        height: 25,
        borderWidth: 1,
        flexShrink: 0,
        borderStyle: "solid",
    }

    const { userList } = props;

    const mods = Object.values(userList).filter(user => user.mod)
    const vips = Object.values(userList).filter(user => user.vip)
    const theRest = Object.values(userList).filter(user => !user.mod && !user.vip)

    return <FlexCol style={{ borderStyle: "solid", borderWidth: 1, borderColor: "red", height: "80vh" }}>
        <FlexCol style={{ overflow: "hidden", height: "95%" }}>
            <FlexCol style={{ maxHeight: "100%", flexGrow: 1, marginTop: -6, marginRight: -6, marginLeft: -6, borderWidth: 1, borderStyle: "solid", backgroundColor: "white" }}>
                <BuddyListCategory
                    name="Mods"
                    users={mods}
                />

                <BuddyListCategory
                    name="VIPs"
                    users={vips}
                />

                <BuddyListCategory
                    name="Friends"
                    users={theRest}
                />
            </FlexCol>
        </FlexCol>
    </FlexCol>
}