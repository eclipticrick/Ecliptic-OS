import * as React from 'react';
import * as classes from './DesktopIcon.module.scss';
import {ApplicationId, IApplication} from '../../../../appdata/applications';
import ApplicationContextMenu, {OuterContextType} from '../../../ContextMenu/specific/ApplicationContextMenu/ApplicationContextMenu';

export interface IDesktopIconProps {
    application: IApplication
    iconSrc: string
    name: string
    scale?: number
    openWindow: (application: IApplication) => void
}

const desktopIcon = (props: IDesktopIconProps) => {
    const { application, iconSrc, name, scale } = props;

    return (
        <div className={classes.root}>
            <ApplicationContextMenu application={application} context={OuterContextType.DESKTOP}>
                <div className={classes.innerRoot} onClick={() => props.openWindow(application)}>
                    <div className={classes.iconWrapper}>
                        <img src={iconSrc} style={{ transform: `scale(${scale ? scale : 1})` }} draggable={false} />
                    </div>
                    <div className={classes.nameWrapper}>
                        {name}
                    </div>
                </div>
            </ApplicationContextMenu>
        </div>
    );
};

export default desktopIcon;
