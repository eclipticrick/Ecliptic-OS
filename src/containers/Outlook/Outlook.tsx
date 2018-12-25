import * as React from 'react';
import DefaultApplicationWindow, {IDefaultApplicationWindowProps} from '../../components/Window/DefaultApplicationWindow';

export class Outlook extends React.Component<IDefaultApplicationWindowProps, {}> {
    public render() {
        const { windowInstance, application, selected } = this.props;
        return (
            <DefaultApplicationWindow windowInstance={windowInstance} application={application} selected={selected}>
                <div style={{ padding: 12 }}>
                    Outlook
                </div>
            </DefaultApplicationWindow>
        );
    }
}

export default Outlook;
