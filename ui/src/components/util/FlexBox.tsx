import React from "react"

export interface FlexBoxProps {
    [prop: string]: string | boolean | number | any,
    //inline?: boolean
}

export const FlexRow = (props: FlexBoxProps) => {
    return (
        <div
            style={{
                ...props.style ?? {},
                display: "flex",
                flexDirection: "row",
                ...props
            }}
        >
            {props.children}
        </div>
    );
}

export const FlexCol = (props: FlexBoxProps) => {
    return (
        <div
            style={{
                ...props.style ?? {},
                display: "flex",
                flexDirection: "column",
                ...props
            }}
        >
            {props.children}
        </div>
    );
}
