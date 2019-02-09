import * as React from 'react';
import * as classes from './TaskBar.module.scss';
import {IStore} from '../../store/initialize';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Resizable from 're-resizable';
import StartButton from './StartButton/StartButton';
import QuickAccess from './QuickAccess/QuickAccess';
import ActiveWindows from './ActiveWindows/ActiveWindows';
import SystemTray from './SystemTray/SystemTray';
import {ApplicationId, IApplication} from '../../appdata/applications';
import {IWindowInstance, WindowInstanceType} from '../../apptypings/window';
import classNames from 'classnames';

export interface ITaskbarProps {
    height: number
    quickAccessWidth: number
    quickAccessShortcuts: ApplicationId[]
    windowInstances: IWindowInstance[]
}

export interface ITaskbarPassedProps {
    startMenuIsOpen: boolean
    setTaskbarHeight: (height: number) => void
    setQuickAccessWidth: (width: number) => void
    openWindow: (application: IApplication) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
    selectWindow: (instanceId: number) => void
    minimizeWindow: (instanceId: number) => void
    openStartMenu: () => void
    closeStartMenu: () => void
}

export class TaskBar extends React.Component<ITaskbarProps & ITaskbarPassedProps, {}> {
    public render() {
        const { props, props: { height, quickAccessShortcuts, quickAccessWidth, windowInstances, startMenuIsOpen } } = this; // popup

        const openWindow = (application: IApplication) => {
            props.openWindow(application);
            props.addRecentApplicationToStartMenu(application.id);
        };

        const hasPopups = !!windowInstances.filter(windowInstance => windowInstance.type === WindowInstanceType.POPUP).length;

        return (
            <div className={classNames(classes.root, hasPopups ? classes.unClickable : null)}>
                <Resizable
                    size={{ height }}
                    enable={{top: true}}
                    minHeight={36}
                    maxHeight={50}
                    onResizeStop={(e, direction, ref, d) => {
                        props.setTaskbarHeight(height + d.height);
                    }}>
                    <div className={classes.taskBarContent}>

                        <StartButton taskBarHeight={height}
                                     startMenuIsOpen={startMenuIsOpen}
                                     openStartMenu={props.openStartMenu}
                                     closeStartMenu={props.closeStartMenu}/>

                        <QuickAccess shortcuts={quickAccessShortcuts}
                                     width={quickAccessWidth}
                                     openWindow={openWindow}
                                     setQuickAccessWidth={props.setQuickAccessWidth}/>

                        <ActiveWindows windowInstances={windowInstances}
                                       selectWindow={props.selectWindow}
                                       minimizeWindow={props.minimizeWindow}/>

                        <SystemTray/>

                    </div>
                </Resizable>
            </div>
        );
    }

}
const mapStateToProps = (state: IStore) => {
    const { height, quickAccessShortcuts, quickAccessWidth } = state.taskbar;
    const { windows } = state.windows;
    const { opened } = state.startmenu;
    return { height, quickAccessShortcuts, quickAccessWidth, windowInstances: windows, startMenuIsOpen: opened }
};

const mapDispatchToProps = (dispatch: any): Partial<ITaskbarPassedProps> => ({
    setTaskbarHeight: (height: number) => dispatch(actions.setTaskbarHeight(height)),
    setQuickAccessWidth: (width: number) => dispatch(actions.setQuickAccessWidth(width)),
    openWindow: (application: IApplication) => dispatch(actions.openWindow(application)),
    selectWindow: (id: number) => dispatch(actions.selectWindow(id)),
    minimizeWindow: (id: number) => dispatch(actions.minimizeWindow(id)),
    openStartMenu: () => dispatch(actions.openStartMenu()),
    closeStartMenu: () => dispatch(actions.closeStartMenu()),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);
