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

export interface IDesktopProps {
    taskbarHeight: number
    windows: IWindowInstance[]
    shortcuts: ApplicationId[]
    popup: IPopupInstance
    openWindow: (applicationId: ApplicationId) => any // TODO: generalize?
}

export class Desktop extends React.Component<IDesktopProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, windows, shortcuts, popup } } = this;

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>

                <Background taskbarHeight={taskbarHeight}/>
                <IconGrid shortcuts={shortcuts} openWindow={props.openWindow}/>

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
    const { taskbar } = state.config;
    const { windows, popup } = state.windows;
    const { shortcuts } = state.desktop;
    return { taskbarHeight: taskbar.height, windows, shortcuts, popup }
};

const mapDispatchToProps = (dispatch: any): Partial<IDesktopProps> => ({
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
