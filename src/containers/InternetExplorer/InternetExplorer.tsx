import * as React from 'react';
import * as classes from './InternetExplorer.module.scss';
import DefaultApplicationWindow, {IDefaultApplicationWindowProps} from '../../components/Window/DefaultApplicationWindow';

export class InternetExplorer extends React.Component<IDefaultApplicationWindowProps, {}> {
    public render() {
        const { windowInstance, application, selected } = this.props;
        return (
            <DefaultApplicationWindow windowInstance={windowInstance} application={application} selected={selected}>
                <div className={classes.root}>
                    InternetExplorer
                </div>
            </DefaultApplicationWindow>
        );
    }
}

export default InternetExplorer;
