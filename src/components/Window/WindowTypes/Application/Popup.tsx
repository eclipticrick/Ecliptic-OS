import * as React from 'react';
import WindowBase from '../../WindowBase/WindowBase';
import {IWindowInstance} from "../../../../apptypings/window";
import {ReactNode} from "react";
import * as classes from './Popup.module.scss';

export interface IPopupWindowProps {
    windowInstance: IWindowInstance
    minimizable?: boolean
    children?: ReactNode
}

const popupWindow = ({ windowInstance, minimizable, children }: IPopupWindowProps) => {
    const { icon, window } = windowInstance.application;
    return (
        <WindowBase windowInstance={windowInstance}
                    title={window.title ? window.title : 'no title provided'}
                    minWidth={250}
                    minHeight={100}
                    iconSrc={icon.src}
                    maximizable={false}
                    showMaximizeButton={false}
                    showMinimizeButton={!!minimizable}>
            <div className={classes.root}>
                { children }
            </div>
        </WindowBase>
    );
};

export default popupWindow;
