import { useEffect, useRef, useState } from "react"
import { useTwitchChat } from "../../../hooks/twitchChat"
import { FlexCol, FlexRow } from "../../util/FlexBox"
import { WindowsDialog } from "../../WindowsEmu/WindowsDialog"
import { BuddyListTabMenu } from "./BuddyListTabMenu"
import { BuddyListUserTab } from "./BuddyListUserTab"

const statusCheckIntervalMillis = 5000

const loginDurationMillis = 30 * 1e3
const awayDurationMillis = 10 * 60 * 1e3
const logoutDurationMillis = awayDurationMillis + 5 * 60 * 1e3
const removeDurationMillis = logoutDurationMillis + 30 * 1e3

export interface BuddyListProps {

}

export const BuddyList = (props: BuddyListProps) => {
    const channelName = "julie"
    const [currentMessage, popMessage] = useTwitchChat(channelName)

    const [userList, setUserList] = useState<Record<string, any>>({})
    const evalUserList = useRef(userList)

    useEffect(() => {
        popMessage()
    }, [currentMessage])

    // Move this along w/ the userlist state/logic :)
    useEffect(() => {
        if (currentMessage) {
            let currentUser = userList[currentMessage?.userstate?.["user-id"]]
            const now = Date.now()
            if (!currentUser) {
                currentUser = currentMessage.userstate
                currentUser.firstMessageTimeMillis = now
                currentUser.lastMessageTimeMillis = now
                currentUser.status = "login"
            }
            currentUser.lastMessageTimeMillis = now
            setUserList({
                ...userList,
                [currentMessage?.userstate?.["user-id"]]: currentUser
            })
        }
    }, [currentMessage])

    useEffect(() => {
        updateTask()
    }, [])

    useEffect(() => {
        evalUserList.current = userList
    }, [userList])

    function updateTask() {
        updateUserStatuses()
        setTimeout(() => updateTask(), statusCheckIntervalMillis)
    }

    function updateUserStatuses() {
        const now = Date.now()

        const removeUserIds: string[] = []
        Object.values(evalUserList.current).forEach((user: any) => {
            const firstMessageTimeMillis = user.firstMessageTimeMillis;
            const lastMessageMillis = user.lastMessageTimeMillis;
            const timeSinceFirstMessage = now - firstMessageTimeMillis;
            const timeSinceLastMessage = now - lastMessageMillis;

            user.status = "present"
            if (timeSinceFirstMessage < loginDurationMillis) {
                user.status = "login"
            }

            if (timeSinceLastMessage > awayDurationMillis) {
                user.status = "away"
            }

            if (timeSinceLastMessage > logoutDurationMillis) {
                user.status = "logout"
            }

            if (timeSinceLastMessage > removeDurationMillis) {
                removeUserIds.push(user["user-id"])
            }
        })

        removeUserIds.forEach(userId => delete evalUserList.current[userId])
        setUserList({
            ...evalUserList.current
        })
    }

    return (
        <>
            {/* <Test userList={userList}/> */}
                <WindowsDialog style={{ maxWidth: 350, height: "100%" }} title={`${channelName}'s Buddy List`}>
                    <FlexRow alignItems="center" marginLeft={8} marginTop={-6} >
                        <p style={{ marginRight: 16 }}>My Stream</p>
                        <p style={{ marginRight: 16 }}>People</p>
                        <p style={{ marginRight: 16 }}>Help</p>
                    </FlexRow>
                    <hr style={{ marginTop: -6, width: "98%" }} />
                    <FlexRow justifyContent="center" style={{ marginBottom: 10 }}>
                        <img src={`images/AIM_97_blue.webp`} />
                    </FlexRow>
                    {/* <Test userList={userList}/> */}
                    <FlexCol className="tabs" style={{ display: "flex", flexDirection: "column", justifyContent: "stretch", flexGrow: 1, marginRight: 6, marginLeft: 6, height: "40vh", overflow: "hidden" }}>
                        <BuddyListTabMenu />
                        <BuddyListUserTab userList={userList}/>
                    </FlexCol>
                </WindowsDialog>
        </>
    )
}
