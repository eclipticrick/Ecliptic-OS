import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import InternetExplorer from '../../containers/InternetExplorer/InternetExplorer';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

export interface IDesktopProps {
    taskbarHeight: number
}

export class Desktop extends React.Component<IDesktopProps, {}> {
    public render() {
        const { taskbarHeight } = this.props;

        return (
            <div className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>
                <Background taskbarHeight={taskbarHeight}/>
                <IconGrid/>
                <InternetExplorer/>
            </div>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { taskbar } = state.config;
    return { taskbarHeight: taskbar.height }
};

export default connect(mapStateToProps)(Desktop);
