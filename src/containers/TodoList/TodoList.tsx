import * as React from 'react';
import GenericWindow, {IGenericWindowProps} from '../../components/Window/GenericWindow';

export class TodoList extends React.Component<IGenericWindowProps, {}> {
    public render() {
        const { applicationId, maximized, minimized, selected } = this.props;
        return (
            <GenericWindow applicationId={applicationId} minimized={minimized} maximized={maximized} selected={selected}>
                <div style={{ padding: 12 }}>
                    TodoList
                </div>
            </GenericWindow>
        );
    }
}

export default TodoList;
