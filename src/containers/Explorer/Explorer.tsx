import * as React from 'react';
import * as classes from './Explorer.module.scss';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';

export interface ExplorerLocation {
    drive: string,
    location: string[],
}

export interface IExplorerWindowState extends ExplorerLocation {
    selected: string[],
    history: ExplorerLocation[]
}

export class Explorer extends React.Component<IDefaultWindowProps, IExplorerWindowState> {
    public state = {
        selected: [] as string[],
        drive: null as string,
        location: [] as string[],
        history: [] as any[]
    };
    public render() {
        const { windowInstance } = this.props;
        const { drive } = this.state;
        return (
            <Window.Default windowInstance={windowInstance}>
                <div className={classes.root}>
                </div>
            </Window.Default>
        );
    }
}

export default Explorer;
