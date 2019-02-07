import * as React from 'react';
import * as classes from './InternetExplorer.module.scss';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';

export class InternetExplorer extends React.Component<IDefaultWindowProps, {}> {
    public render() {
        const { windowInstance } = this.props;
        return (
            <Window.Default windowInstance={windowInstance}>
                <div className={classes.root}>
                    InternetExplorer
                </div>
            </Window.Default>
        );
    }
}

export default InternetExplorer;
