import * as React from 'react';
import * as classes from './TaskBar.module.scss';
import {IStore} from '../../store/initialize';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Resizable from 're-resizable';
import StartButton from './StartButton/StartButton';
import QuickAccess from './QuickAccess/QuickAccess';
import {ApplicationId} from '../../appdata/applications';

export interface ITaskbarProps {
    height: number
    quickAccessWidth: number
    quickAccessShortcuts: ApplicationId[]
    setTaskbarHeight: (height: number) => void // TODO: generalize
    setQuickAccessWidth: (width: number) => void // TODO: generalize
    openWindow: (applicationId: ApplicationId) => void // TODO: generalize?
}

export class TaskBar extends React.Component<ITaskbarProps, {}> {
    public render() {
        const { props, props: { height, quickAccessShortcuts, quickAccessWidth } } = this;

        return (
            <div className={classes.root}>
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
                    </div>
                </Resizable>
            </div>
        );
    }

}
const mapStateToProps = (state: IStore) => {
    const { height, quickAccessShortcuts, quickAccessWidth } = state.taskbar;
    return { height, quickAccessShortcuts, quickAccessWidth }
};

const mapDispatchToProps = (dispatch: any): Partial<ITaskbarProps> => ({
    setTaskbarHeight: (height: number) => dispatch(actions.setTaskbarHeight(height)),
    setQuickAccessWidth: (width: number) => dispatch(actions.setQuickAccessWidth(width)),
    openWindow: (id: ApplicationId) => dispatch(actions.openWindow(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);
