import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

import applications, {ApplicationId} from '../../appdata/applications';
import {IPopupInstance, IWindowInstance} from '../../appdata/window';
import * as actions from '../../store/actions';
import PopupWindow from '../Window/Base/PopupWindow';
import {IBackground} from '../../store/reducers/desktop';

export interface IDesktopProps {
    taskbarHeight: number
    windows: IWindowInstance[]
    shortcuts: ApplicationId[]
    popup: IPopupInstance
}
export interface IDesktopPassedProps {
    background: IBackground
    openWindow: (id: ApplicationId) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
}

export class Desktop extends React.Component<IDesktopProps & IDesktopPassedProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, windows, shortcuts, popup, background } } = this;

        const openWindow = (applicationId: ApplicationId) => {
            props.openWindow(applicationId);
            props.addRecentApplicationToStartMenu(applicationId);
        };

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>
                <Background taskbarHeight={taskbarHeight} background={background}/>
                <IconGrid shortcuts={shortcuts} openWindow={openWindow}/>

                {windows.map((window, i: number) => {
                    const application = applications.find(app => app.id === window.applicationId);
                    const { Component } = application.window;

                    return (
                        <div key={`window-${window.instanceId}`} className={classes.windowWrapper}>
                            <Component windowInstance={window} application={application} selected={windows.length - 1 === i && !popup}/>
                        </div>
                    )
                })}

                {popup ? (
                    <div className={classes.popupWrapper}>
                        <PopupWindow popup={popup}>{ popup.children }</PopupWindow>
                    </div>
                ) : null}

            </div>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { height } = state.taskbar;
    const { windows, popup } = state.windows;
    const { shortcuts, background } = state.desktop;
    return { taskbarHeight: height, windows, shortcuts, popup, background }
};

const mapDispatchToProps = (dispatch: any): Partial<IDesktopPassedProps> => ({
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
