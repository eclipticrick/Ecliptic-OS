import * as React from 'react';
import {connect} from 'react-redux';
import {IStore} from '../../../../store/initialize';
import {ApplicationId} from '../../../../appdata/applications';
import * as actions from '../../../../store/actions/index';
import ContextMenu, {IContextItem, IContextMenu} from '../../ContextMenu';
import contextMenuItems from './contextMenuItems';

export enum OuterContextType {
    DESKTOP = 'DESKTOP',
    STARTMENU_PINNED = 'STARTMENU_PINNED',
    STARTMENU_RECENT = 'STARTMENU_RECENT',
    STARTMENU_ALL = 'STARTMENU_ALL',
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
    addQuickAccessShortcut: (id: ApplicationId) => void
    removeQuickAccessShortcut: (id: ApplicationId) => void
    pinApplicationToStartMenu: (id: ApplicationId) => void
    unpinApplicationToStartMenu: (id: ApplicationId) => void
}

export class ApplicationContextMenu extends React.Component<IApplicationContextMenuProps & IApplicationContextMenuPassedProps, {}> {
    public render() {
        const { props, props: {applicationId, context, children} } = this;

        const items: IContextItem[] = contextMenuItems(props);

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
    addQuickAccessShortcut: (id: ApplicationId) => dispatch(actions.addQuickAccessShortcut(id)),
    removeQuickAccessShortcut: (id: ApplicationId) => dispatch(actions.removeQuickAccessShortcut(id)),
    pinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.pinApplicationToStartMenu(id)),
    unpinApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.unpinApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContextMenu);
