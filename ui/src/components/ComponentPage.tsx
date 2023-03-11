import "../styles/component-page.scss"

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

