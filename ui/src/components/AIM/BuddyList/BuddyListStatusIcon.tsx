import { UserStatus } from "./BuddyListUser"

export interface BuddyListStatusIconProps {
    status: UserStatus
}

const iconPaths: Record<UserStatus, string> = {
    "away": "images/away-icon.ico",
    "login": "images/login-icon.png",
    "logout": "images/logout-icon.png",
    "present": ""
}

export const BuddyListStatusIcon = (props: BuddyListStatusIconProps) => {
    return (
        <div style={{ width: 18, height: 18, marginRight: 5 }}>
            <img style={{ width: 18 }} src={iconPaths[props.status]} />
        </div>
    )
}