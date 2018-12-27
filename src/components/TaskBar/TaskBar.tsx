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
import {ApplicationId} from '../../appdata/applications';
import {IPopupInstance, IWindowInstance} from '../../appdata/window';
import classNames from 'classnames';

export interface ITaskbarProps {
    height: number
    quickAccessWidth: number
    quickAccessShortcuts: ApplicationId[]
    windowInstances: IWindowInstance[]
}

export interface ITaskbarPassedProps {
    popup: IPopupInstance
    setTaskbarHeight: (height: number) => void
    setQuickAccessWidth: (width: number) => void
    openWindow: (applicationId: ApplicationId) => void
    selectWindow: (instanceId: number) => void
    minimizeWindow: (instanceId: number) => void
}

export class TaskBar extends React.Component<ITaskbarProps & ITaskbarPassedProps, {}> {
    public render() {
        const { props, props: { height, quickAccessShortcuts, quickAccessWidth, windowInstances, popup } } = this;

        return (
            <div className={classNames(classes.root, popup ? classes.unClickable : null)}>
                <Resizable
                    size={{ height }}
                    enable={{top: true}}
                    minHeight={36}
                    maxHeight={50}
                    onResizeStop={(e, direction, ref, d) => {
                        props.setTaskbarHeight(height + d.height);
                    }}>
                    <div className={classes.taskBarContent}>

                        <StartButton taskBarHeight={height}/>

                        <QuickAccess shortcuts={quickAccessShortcuts}
                                     width={quickAccessWidth}
                                     openWindow={props.openWindow}
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
    const { windows, popup } = state.windows;
    return { height, quickAccessShortcuts, quickAccessWidth, windowInstances: windows, popup }
};

const mapDispatchToProps = (dispatch: any): Partial<ITaskbarPassedProps> => ({
    setTaskbarHeight: (height: number) => dispatch(actions.setTaskbarHeight(height)),
    setQuickAccessWidth: (width: number) => dispatch(actions.setQuickAccessWidth(width)),
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
    selectWindow: (id: number) => dispatch(actions.selectWindow(id)),
    minimizeWindow: (id: number) => dispatch(actions.minimizeWindow(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);
