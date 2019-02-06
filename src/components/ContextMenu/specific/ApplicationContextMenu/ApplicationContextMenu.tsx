import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationId, IApplication} from '../../../../appdata/applications';
import * as actions from '../../../../store/actions/index';
import ContextMenu, {IContextItem, IContextMenu} from '../../ContextMenu';
import contextMenuItems from './contextMenuItems';
import {ReactNode} from 'react';

export enum OuterContextType {
    DESKTOP = 'DESKTOP',
    STARTMENU_PINNED = 'STARTMENU_PINNED',
    STARTMENU_RECENT = 'STARTMENU_RECENT',
    STARTMENU_ALL = 'STARTMENU_ALL',
    TASKBAR_QUICKACCESS = 'TASKBAR_QUICKACCESS'
}
export interface IApplicationContextMenuProps {
    application: IApplication
    context: OuterContextType
    children: ReactNode
}
export interface IApplicationContextMenuPassedProps {
    openWindow: (application: IApplication) => void
    addDesktopShortcut: (id: ApplicationId) => void
    removeDesktopShortcut: (id: ApplicationId) => void
    addQuickAccessShortcut: (id: ApplicationId) => void
    removeQuickAccessShortcut: (id: ApplicationId) => void
    pinApplicationToStartMenu: (id: ApplicationId) => void
    unpinApplicationToStartMenu: (id: ApplicationId) => void
}

export class ApplicationContextMenu extends React.Component<IApplicationContextMenuProps & IApplicationContextMenuPassedProps, {}> {
    public render() {
        const { props, props: {application, context, children} } = this;

        const items: IContextItem[] = contextMenuItems(props);

        const menu = { items } as IContextMenu;

        return (
            <ContextMenu uid={`${context.toLowerCase()}-${application.id}`} menu={menu}>
                {children}
            </ContextMenu>
        );
    }
}

const mapDispatchToProps = (dispatch: any): Partial<IApplicationContextMenuPassedProps> => ({
    openWindow: (application: IApplication) => dispatch(actions.openWindow(application)),
    addDesktopShortcut: (id: ApplicationId) => dispatch(actions.addDesktopShortcut(id)),
    removeDesktopShortcut: (id: ApplicationId) => dispatch(actions.removeDesktopShortcut(id)),
    addQuickAccessShortcut: (id: ApplicationId) => dispatch(actions.addQuickAccessShortcut(id)),
    removeQuickAccessShortcut: (id: ApplicationId) => dispatch(actions.removeQuickAccessShortcut(id)),
    pinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.pinApplicationToStartMenu(id)),
    unpinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.unpinApplicationToStartMenu(id)),
});
export default connect(null, mapDispatchToProps)(ApplicationContextMenu);
