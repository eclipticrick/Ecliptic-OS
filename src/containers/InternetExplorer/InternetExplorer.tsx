import * as React from 'react';
import * as classes from './InternetExplorer.module.scss';
import GenericWindow, {IGenericWindowProps} from '../GenericWindow/GenericWindow';

export class InternetExplorer extends React.Component<IGenericWindowProps, {}> {
    public render() {
        const { applicationId, maximized, minimized } = this.props;
        return (
            <GenericWindow applicationId={applicationId} minimized={minimized} maximized={maximized}>
                <div className={classes.root}>
                    InternetExplorer
                </div>
            </GenericWindow>
        );
    }
}

export default InternetExplorer;
