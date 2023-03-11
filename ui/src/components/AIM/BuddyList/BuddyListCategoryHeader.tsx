import { FlexRow } from "../../util/FlexBox"

export interface BuddyListCategoryHeaderProps {
    label: string
    numUsers: number
}

export const BuddyListCategoryHeader = (props: BuddyListCategoryHeaderProps) => {
    return (
        <FlexRow alignContent="center">
            <div style={{ marginRight: 2 }} ><img src={"images/expanded-icon.png"} /></div>
            <p style={{ fontSize: 14, fontWeight: "bold", margin: 1 }}>{props.label} ({props.numUsers})</p>
        </FlexRow>
    )
}
