import * as React from 'react';
import Window from './Base/Window';
import applications, {ApplicationId} from '../../appdata/applications';

export interface IGenericWindowProps {
    applicationId: ApplicationId
    minimized: boolean
    maximized: boolean
    selected: boolean
    children?: any // TODO inherit from React.Props ?
}

const genericWindow = ({ applicationId, minimized, maximized, selected, children }: IGenericWindowProps) => {
    const { id, icon, window: {title, minWidth, minHeight} } = applications.find(a => a.id === applicationId);

    return (
        <Window applicationId={id}
                title={title}
                minWidth={minWidth}
                minHeight={minHeight}
                iconSrc={icon.src}
                minimized={minimized}
                maximized={maximized}
                selected={selected}>
            { children }
        </Window>
    );
};

export default genericWindow;
