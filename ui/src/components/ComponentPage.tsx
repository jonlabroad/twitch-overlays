import React from "react"
import { useLocation } from "react-router";
import Config from "../Config";

export interface ComponentPageProps {
    children: any
}

export const ComponentPage = (props: ComponentPageProps) => {
    return (
        <div className="component-page">
            {props.children}
        </div>
    );
}

