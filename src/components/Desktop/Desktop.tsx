import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

import applications, {ApplicationId, IApplication} from '../../appdata/applications';
import {IWindowInstance, WindowInstanceType} from '../../apptypings/window';
import * as actions from '../../store/actions';
import {IBackground} from '../../store/reducers/desktop';
import Window from '../Window/Window';

export interface IDesktopProps {
    taskbarHeight: number
    windows: IWindowInstance[]
    shortcuts: ApplicationId[]
    // popup: IApplication
}
export interface IDesktopPassedProps {
    background: IBackground
    openWindow: (application: IApplication) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
}

export class Desktop extends React.Component<IDesktopProps & IDesktopPassedProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, windows, shortcuts, background } } = this; // popup

        const openWindow = (application: IApplication) => {
            props.openWindow(application);
            props.addRecentApplicationToStartMenu(application.id);
        };

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>
                <Background taskbarHeight={taskbarHeight} background={background}/>
                <IconGrid shortcuts={shortcuts} openWindow={openWindow}/>

                {windows.map((window, i: number) => {
                    const application = window.application; // applications.find(app => app.id === window.applicationId);
                    const { Component } = application.window;
                    if (window.type === WindowInstanceType.APPLICATION) {
                        return (
                            <div key={`window-${window.instanceId}`} className={classes.windowWrapper}>
                                <Component windowInstance={window} selected={windows.length - 1 === i}/> {/* application={application} */}{/*  && !popup */}
                                {/* todo: replace selected here with selectedWindowInstance in Redux & access in WindowBase.tsx */}
                            </div>
                        )
                    } else if (window.type === WindowInstanceType.POPUP) {
                        return (
                            <div className={classes.popupWrapper}>
                                <Component windowInstance={window} selected={true}>{ application.window.children }</Component> {/* popup={popup} */}
                            </div>
                        )
                    }
                    // else {
                    //     return (
                    //         <div className={classes.popupWrapper}>
                    //             <Window.Popup windowInstance={window} popup={popup} selected={true}>{ popup.children }</Window.Popup>
                    //         </div>
                    //     )
                    // }
                })}

                {/* popup ? (
                    <div className={classes.popupWrapper}>
                        <Window.Popup popup={popup} selected={true}>{ popup.children }</Window.Popup>
                    </div>
                ) : null */ }

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
