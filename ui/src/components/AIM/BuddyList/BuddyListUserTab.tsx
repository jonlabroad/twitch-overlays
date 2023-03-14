import { FlexCol } from "../../util/FlexBox"
import { BuddyListCategory } from "./BuddyListCategory"

export const BuddyListUserTab = (props: {userList: Record<string, any>}) => {
    const { userList } = props;

    const mods = Object.values(userList).filter(user => user.mod)
    const vips = Object.values(userList).filter(user => user.vip)
    const theRest = Object.values(userList).filter(user => !user.mod && !user.vip)

    return (
        <article style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }} role="tabpanel" id="online">
        <FlexCol style={{
            maxHeight: "100%",
            flexGrow: 1,
            marginTop: -6,
            marginRight: -6,
            marginLeft: -6,
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "white",
            overflow: "hidden"
        }}>
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
    </article>
    )
}