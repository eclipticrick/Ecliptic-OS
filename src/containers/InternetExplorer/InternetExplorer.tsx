import * as React from 'react';
import * as classes from './InternetExplorer.module.scss';
import GenericWindow, {IGenericWindowProps} from '../../components/Window/GenericWindow';

export class InternetExplorer extends React.Component<IGenericWindowProps, {}> {
    public render() {
        const { windowInstance, application, selected } = this.props;
        return (
            <GenericWindow windowInstance={windowInstance} application={application} selected={selected}>
                <div className={classes.root}>
                    InternetExplorer
                </div>
            </GenericWindow>
        );
    }
}

export default InternetExplorer;
