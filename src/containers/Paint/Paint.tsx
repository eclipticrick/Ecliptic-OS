import * as React from 'react';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';

export class Paint extends React.Component<IDefaultWindowProps, {}> {
    public render() {
        const { windowInstance, selected } = this.props;
        return (
            <Window.Default windowInstance={windowInstance} selected={selected}>
                <div style={{ padding: 12 }}>
                    Paint
                </div>
            </Window.Default>
        );
    }
}

export default Paint;
