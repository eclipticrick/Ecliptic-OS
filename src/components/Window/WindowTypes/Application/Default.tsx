import * as React from 'react';
import WindowBase from '../../WindowBase/WindowBase';
import {IWindowInstance} from "../../../../apptypings/window";
import {IApplication} from "../../../../appdata/applications";
import {ReactNode} from "react";

export interface IDefaultWindowProps {
    windowInstance: IWindowInstance
    // application: IApplication
    selected: boolean
    minWidth?: number
    minHeight?: number
    maximizable?: boolean
    children?: ReactNode
}

const defaultWindow = ({ windowInstance, selected, minWidth, minHeight, maximizable, children }: IDefaultWindowProps) => {{/* application */}
    const { icon, window } = windowInstance.application;

    return (
        <WindowBase windowInstance={windowInstance}
                    title={window.title ? window.title : 'no title provided'}
                    minWidth={minWidth ? minWidth : 250}
                    minHeight={minHeight ? minHeight : 250}
                    iconSrc={icon.src}
                    maximizable={typeof maximizable === 'undefined' ? true : maximizable}
                    selected={selected} // todo: replace selected here with selectedWindowInstance in Redux & access in WindowBase.tsx
                    showMaximizeButton={true}
                    showMinimizeButton={true}>
            { children }
        </WindowBase>
    );
};

export default defaultWindow;
