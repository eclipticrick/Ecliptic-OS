import * as React from 'react';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';

export class Notepad extends React.Component<IDefaultWindowProps, {}> {
    public render() {
        const { windowInstance, selected } = this.props;
        return (
            <Window.Default windowInstance={windowInstance} selected={selected}>
                <div style={{ padding: 12 }}>
                    Notepad
                </div>
            </Window.Default>
        );
    }
}

export default Notepad;
