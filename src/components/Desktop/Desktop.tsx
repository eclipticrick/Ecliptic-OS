import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

import applications, {ApplicationId} from '../../appdata/applications';
import {IWindowInstance} from '../../appdata/window';
import * as actions from '../../store/actions';

export interface IDesktopProps {
    taskbarHeight: number
    windows: IWindowInstance[]
    shortcuts: ApplicationId[]
    openWindow: (applicationId: ApplicationId) => any // TODO: generalize?
}

export class Desktop extends React.Component<IDesktopProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, windows, shortcuts } } = this;

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>

                <Background taskbarHeight={taskbarHeight}/>
                <IconGrid shortcuts={shortcuts} openWindow={props.openWindow}/>

                {windows.map((window, i: number) => {
                    const application = applications.find(app => app.id === window.applicationId);
                    const { Component } = application.window;

                    return (
                        <div key={`window-${application.id}`} className={classes.windowWrapper}>
                            <Component applicationId={application.id}
                                       maximized={window.maximized}
                                       minimized={window.minimized}
                                       selected={windows.length - 1 === i}/>
                        </div>
                    )
                })}

            </div>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { taskbar } = state.config;
    const { windows } = state.windows;
    const { shortcuts } = state.desktop;
    return { taskbarHeight: taskbar.height, windows, shortcuts }
};

const mapDispatchToProps = (dispatch: any): Partial<IDesktopProps> => ({
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
