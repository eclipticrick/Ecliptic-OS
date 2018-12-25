import * as React from 'react';
import GenericWindow, {IGenericWindowProps} from '../../components/Window/GenericWindow';

export class TodoList extends React.Component<IGenericWindowProps, {}> {
    public render() {
        const { windowInstance, application, selected } = this.props;
        return (
            <GenericWindow windowInstance={windowInstance} application={application} selected={selected}>
                <div style={{ padding: 12 }}>
                    TodoList
                </div>
            </GenericWindow>
        );
    }
}

export default TodoList;
