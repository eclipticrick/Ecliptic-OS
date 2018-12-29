import * as React from 'react';
import {connect} from 'react-redux';
import {IStore} from '../../../store/initialize';
import applications, {ApplicationId} from '../../../appdata/applications';
import * as actions from '../../../store/actions';
import ContextMenu, {IContextItem, IContextMenu, ContextMenuType} from '../ContextMenu';

export enum OuterContextType {
    DESKTOP = 'DESKTOP',
    STARTMENU_PINNED = 'STARTMENU_PINNED',
    TASKBAR_QUICKACCESS = 'TASKBAR_QUICKACCESS'
}
export interface IApplicationContextMenuProps {
    applicationId: ApplicationId
    context: OuterContextType
    children: any // todo: inherit from react props?
}
export interface IApplicationContextMenuPassedProps {
    openWindow: (id: ApplicationId) => void
    addDesktopShortcut: (id: ApplicationId) => void
    removeDesktopShortcut: (id: ApplicationId) => void
    addQuickAccesShortcut: (id: ApplicationId) => void
    removeQuickAccesShortcut: (id: ApplicationId) => void
    pinApplicationToStartMenu: (id: ApplicationId) => void
    unpinApplicationToStartMenu: (id: ApplicationId) => void
}

export class ApplicationContextMenu extends React.Component<IApplicationContextMenuProps & IApplicationContextMenuPassedProps, {}> {
    public render() {
        const { props, props: {applicationId, context, children} } = this;

        let contextSpecificItems = [] as IContextItem[];
        if (context === OuterContextType.DESKTOP) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                {
                    type: ContextMenuType.MENUITEM,
                    name: 'Remove',
                    onClick: () => props.removeDesktopShortcut(applicationId)
                },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Start menu (pin)',
                            onClick: () => props.pinApplicationToStartMenu(applicationId)
                        },
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Task bar (make shortcut)',
                            onClick: () => props.addQuickAccesShortcut(applicationId)
                        }
                    ] as IContextItem[]
                }
            ];
        }
        if (context === OuterContextType.TASKBAR_QUICKACCESS) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                {
                    type: ContextMenuType.MENUITEM,
                    name: 'Remove',
                    onClick: () => props.removeQuickAccesShortcut(applicationId)
                },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Desktop (make shortcut)',
                            onClick: () => props.addDesktopShortcut(applicationId)
                        },
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Start menu (pin)',
                            onClick: () => props.pinApplicationToStartMenu(applicationId)
                        }
                    ] as IContextItem[]
                }
            ];
        }
        if (context === OuterContextType.STARTMENU_PINNED) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                {
                    type: ContextMenuType.MENUITEM,
                    name: 'Unpin',
                    onClick: () => props.unpinApplicationToStartMenu(applicationId)
                },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Desktop (make shortcut)',
                            onClick: () => props.addDesktopShortcut(applicationId)
                        },
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Task bar (make shortcut)',
                            onClick: () => props.addQuickAccesShortcut(applicationId)
                        }
                    ] as IContextItem[]
                }
            ];
        }
        const items: IContextItem[] = [
            { type: ContextMenuType.MENUITEM, name: 'Open', onClick: () => props.openWindow(applicationId) },
            ...contextSpecificItems
        ];

        const menu = { items } as IContextMenu;

        return (
            <ContextMenu uid={`${context.toLowerCase()}-${applicationId}`} menu={menu}>
                {children}
            </ContextMenu>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { height } = state.taskbar;
    const { windows, popup } = state.windows;
    const { shortcuts } = state.desktop;
    return { taskbarHeight: height, windows, shortcuts, popup }
};

const mapDispatchToProps = (dispatch: any): Partial<IApplicationContextMenuPassedProps> => ({
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
    addDesktopShortcut: (id: ApplicationId) => dispatch(actions.addDesktopShortcut(id)),
    removeDesktopShortcut: (id: ApplicationId) => dispatch(actions.removeDesktopShortcut(id)),
    addQuickAccesShortcut: (id: ApplicationId) => dispatch(actions.addQuickAccesShortcut(id)),
    removeQuickAccesShortcut: (id: ApplicationId) => dispatch(actions.removeQuickAccesShortcut(id)),
    pinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.pinApplicationToStartMenu(id)),
    unpinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.unpinApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContextMenu);
