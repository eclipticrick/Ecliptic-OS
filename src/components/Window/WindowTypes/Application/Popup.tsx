import * as React from 'react';
import WindowBase from '../../WindowBase/WindowBase';
import {IWindowInstance} from "../../../../apptypings/window";
import {ReactNode} from "react";
import * as classes from './Popup.module.scss';

export interface IPopupWindowProps {
    windowInstance: IWindowInstance
    selected: boolean
    children?: ReactNode
}

const popupWindow = ({ windowInstance, selected, children }: IPopupWindowProps) => {
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
            <div className={classes.root}>
                { children }
            </div>
        </WindowBase>
    );
};

export default popupWindow;
