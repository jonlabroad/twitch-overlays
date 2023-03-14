export interface BuddyListTabMenuProps {

}

export const BuddyListTabMenu = (props: BuddyListTabMenuProps) => {
    return (
        <menu role="tablist" aria-label="Sample Tabs">
            <button role="tab" aria-selected="true" aria-controls="online">Online</button>
            <button role="tab" aria-controls="listsetup">List Setup</button>
        </menu>
    )
}