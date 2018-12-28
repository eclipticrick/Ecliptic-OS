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
    uniquePrefix: string
    applicationId: ApplicationId
    context: OuterContextType
    children: any // todo: inherit from react props?
}
export interface IApplicationContextMenuPassedProps {
    openWindow: (id: ApplicationId) => void
    addDesktopShortcut: (id: ApplicationId) => void
    removeDesktopShortcut: (id: ApplicationId) => void
}

export class ApplicationContextMenu extends React.Component<IApplicationContextMenuProps & IApplicationContextMenuPassedProps, {}> {
    public render() {
        const { props, props: {applicationId, uniquePrefix, context, children} } = this;

        let contextSpecificItems = [] as IContextItem[];
        if (context === OuterContextType.DESKTOP) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                { type: ContextMenuType.MENUITEM, name: 'Remove', onClick: () => props.removeDesktopShortcut(applicationId) },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        { type: ContextMenuType.MENUITEM, name: 'Start menu (pin)' },
                        { type: ContextMenuType.MENUITEM, name: 'Task bar (make shortcut)' }
                    ] as IContextItem[]
                }
            ];
        }
        if (context === OuterContextType.TASKBAR_QUICKACCESS) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Desktop (make shortcut)',
                            onClick: () => props.addDesktopShortcut(applicationId)
                        },
                        { type: ContextMenuType.MENUITEM, name: 'Start menu (pin)' }
                    ] as IContextItem[]
                }
            ];
        }
        if (context === OuterContextType.STARTMENU_PINNED) {
            contextSpecificItems = [
                { type: ContextMenuType.SEPERATOR },
                {
                    type: ContextMenuType.SUBMENU,
                    name: 'Copy to',
                    items: [
                        {
                            type: ContextMenuType.MENUITEM,
                            name: 'Desktop (make shortcut)',
                            onClick: () => props.addDesktopShortcut(applicationId)
                        },
                        { type: ContextMenuType.MENUITEM, name: 'Task bar (make shortcut)' }
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
            <ContextMenu uid={uniquePrefix + '-' + applicationId} menu={menu}>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContextMenu);
