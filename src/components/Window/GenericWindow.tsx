import * as React from 'react';
import Window from './Base/Window';
import applications, {IApplication} from '../../appdata/applications';
import {IWindowInstance} from '../../appdata/window';

export interface IGenericWindowProps {
    windowInstance: IWindowInstance
    application: IApplication
    selected: boolean
    children?: any // TODO inherit from React.Props ?
}

const genericWindow = ({ windowInstance, application, selected, children }: IGenericWindowProps) => {
    const { id, icon, window: {title, minWidth, minHeight, maximizable} } = applications.find(a => a.id === application.id);

    return (
        <Window instanceId={windowInstance.instanceId}
                applicationId={id}
                title={title}
                minWidth={minWidth}
                minHeight={minHeight}
                iconSrc={icon.src}
                minimized={windowInstance.minimized}
                maximized={windowInstance.maximized}
                maximizable={typeof maximizable === 'undefined' ? true : maximizable}
                selected={selected}>
            { children }
        </Window>
    );
};

export default genericWindow;
