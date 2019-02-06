import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

import {ApplicationId, IApplication} from '../../appdata/applications';
import {IWindowInstance, WindowInstanceType} from '../../apptypings/window';
import * as actions from '../../store/actions';
import {IBackground} from '../../store/reducers/desktop';

export interface IDesktopProps {
    taskbarHeight: number
    windows: IWindowInstance[]
    shortcuts: ApplicationId[]
}
export interface IDesktopPassedProps {
    background: IBackground
    openWindow: (application: IApplication) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
}

export class Desktop extends React.Component<IDesktopProps & IDesktopPassedProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, windows, shortcuts, background } } = this;

        const openWindow = (application: IApplication) => {
            props.openWindow(application);
            props.addRecentApplicationToStartMenu(application.id);
        };
        const popupWindows = windows.filter(window => window.type === WindowInstanceType.POPUP);
        const nonPopupWindows = windows.filter(window => window.type !== WindowInstanceType.POPUP);

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>
                <Background taskbarHeight={taskbarHeight} background={background}/>
                <IconGrid shortcuts={shortcuts} openWindow={openWindow}/>

                {nonPopupWindows.map((window, i: number) => {
                    const application = window.application;
                    const { Component } = application.window;
                    return (
                        <div key={`window-${window.instanceId}`} className={classes.windowWrapper}>
                            <Component windowInstance={window} selected={windows.length - 1 === i}>
                                {application.window.children}
                            </Component>
                            {/* todo: replace selected here with selectedWindowInstance in Redux & access in WindowBase.tsx */}
                        </div>
                    )
                })}
                {!popupWindows.length ? null : <div className={classes.popupWrapper} />}
                {popupWindows.map((window, i: number) => {
                    const application = window.application;
                    const { Component } = application.window;
                    return (
                        <div key={`window-${window.instanceId}`} className={classes.windowWrapper}>
                            <Component windowInstance={window} selected={true}>{ application.window.children }</Component>
                        </div>
                    )
                })}
            </div>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { height } = state.taskbar;
    const { windows } = state.windows; // popup
    const { shortcuts, background } = state.desktop;
    return { taskbarHeight: height, windows, shortcuts, background } // popup
};

const mapDispatchToProps = (dispatch: any): Partial<IDesktopPassedProps> => ({
    openWindow: (application: IApplication) => dispatch(actions.openWindow(application)),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
