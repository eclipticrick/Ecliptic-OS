import * as React from 'react';
import DefaultApplicationWindow, {IDefaultApplicationWindowProps} from '../../components/Window/DefaultApplicationWindow';

export class LimeWire extends React.Component<IDefaultApplicationWindowProps, {}> {
    public render() {
        const { windowInstance, application, selected } = this.props;
        return (
            <DefaultApplicationWindow windowInstance={windowInstance} application={application} selected={selected}>
                <div style={{ padding: 12 }}>
                    LimeWire
                </div>
            </DefaultApplicationWindow>
        );
    }
}

export default LimeWire;
