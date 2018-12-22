import * as React from 'react';
import * as classes from './Word.module.scss';
import GenericWindow, {IGenericWindowProps} from '../GenericWindow/GenericWindow';

export class Word extends React.Component<IGenericWindowProps, {}> {
    public render() {
        const { applicationId, maximized, minimized, selected } = this.props;
        return (
            <GenericWindow applicationId={applicationId} minimized={minimized} maximized={maximized} selected={selected}>
                <div className={classes.root}>
                    word
                </div>
            </GenericWindow>
        );
    }
}

export default Word;
