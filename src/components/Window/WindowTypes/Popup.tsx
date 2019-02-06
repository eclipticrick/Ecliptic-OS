import * as React from 'react';
import WindowBase from '../WindowBase/WindowBase';
import {IWindowInstance} from "../../../apptypings/window";

import {IApplication} from "../../../appdata/applications";
import {ReactNode} from "react";

export interface IPopupWindowProps {
    windowInstance: IWindowInstance
    // application: IApplication
    selected: boolean
    children?: ReactNode
}

const popupWindow = ({ windowInstance, selected, children }: IPopupWindowProps) => { {/* application */}
    const { icon, window } = windowInstance.application;
    return (
        <WindowBase windowInstance={windowInstance}
                    title={window.title ? window.title : 'no title provided'}
                    minWidth={250}
                    minHeight={100}
                    iconSrc={icon.src}
                    maximizable={false}
                    selected={selected} // todo: replace selected here with selectedWindowInstance in Redux & access in WindowBase.tsx
                    showMaximizeButton={false}
                    showMinimizeButton={false}>
            { children }
        </WindowBase>
    );
};

export default popupWindow;
