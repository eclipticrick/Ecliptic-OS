import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import InternetExplorer from '../../containers/InternetExplorer/InternetExplorer';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';
import GoogleChrome from '../../containers/GoogleChrome/GoogleChrome';
import Word from '../../containers/Word/Word';

export interface IDesktopProps {
    taskbarHeight: number
}

export class Desktop extends React.Component<IDesktopProps, {}> {
    public render() {
        const { taskbarHeight } = this.props;

        return (
            <div id='desktop' className={classes.root} style={{ height: `calc(100% - ${taskbarHeight}px)` }}>

                <Background taskbarHeight={taskbarHeight}/>
                <IconGrid/>

                <div className={classes.windowWrapper}>
                    <Word/>
                </div>
                <div className={classes.windowWrapper}>
                    <InternetExplorer/>
                </div>
                <div className={classes.windowWrapper}>
                    <GoogleChrome/>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state: IStore) => {
    const { taskbar } = state.config;
    return { taskbarHeight: taskbar.height }
};

export default connect(mapStateToProps)(Desktop);
