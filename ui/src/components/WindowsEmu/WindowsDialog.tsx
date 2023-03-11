import { ReactChild } from "react";
import "xp.css/dist/XP.css"
import { FlexCol } from "../util/FlexBox";

export interface WindowsDialogProps {
    title: string
    style?: any

    children?: ReactChild | ReactChild[]
}

export const WindowsDialog = (props: WindowsDialogProps) => {
    const { title } = props;

    return <div style={{ ...props.style, display: "flex", flexDirection: "column" }} className="window">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
            <FlexCol className="window-body" style={{ alignItems: "stretch", flexGrow: 1 }}>
                {props.children}
            </FlexCol>
    </div>
}