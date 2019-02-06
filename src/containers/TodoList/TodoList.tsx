import * as React from 'react';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';

export class TodoList extends React.Component<IDefaultWindowProps, {}> {
    public render() {
        const { windowInstance, selected } = this.props;
        return (
            <Window.Default windowInstance={windowInstance} selected={selected}>
                <div style={{ padding: 12 }}>
                    TodoList
                </div>
            </Window.Default>
        );
    }
}

export default TodoList;
