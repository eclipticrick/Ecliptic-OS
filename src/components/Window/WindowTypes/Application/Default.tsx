import * as React from 'react';
import WindowBase from '../../WindowBase/WindowBase';
import {IWindowInstance} from "../../../../apptypings/window";
import {ReactNode} from "react";

export interface IDefaultWindowProps {
    windowInstance: IWindowInstance
    minWidth?: number
    minHeight?: number
    maximizable?: boolean
    children?: ReactNode
}

const defaultWindow = ({ windowInstance, minWidth, minHeight, maximizable, children }: IDefaultWindowProps) => {
    const { icon, window } = windowInstance.application;

    return (
        <WindowBase windowInstance={windowInstance}
                    title={window.title}
                    minWidth={minWidth ? minWidth : 250}
                    minHeight={minHeight ? minHeight : 250}
                    iconSrc={icon.src}
                    maximizable={typeof maximizable === 'undefined' ? true : maximizable}
                    showMaximizeButton={true}
                    showMinimizeButton={true}>
            { children }
        </WindowBase>
    );
};

export default defaultWindow;
