import * as React from 'react';
import * as classes from './DesktopIcon.module.scss';
import {ApplicationId} from '../../../../appdata/applications';

export interface IDesktopIconProps {
    applicationId: ApplicationId
    openWindow: (applicationId: ApplicationId) => any // TODO: generalize?
    iconSrc: string
    name: string
    scale?: number
}

const desktopIcon = (props: IDesktopIconProps) => {
    const { applicationId, iconSrc, name, scale } = props;

    return (
        <div className={classes.root} onClick={() => props.openWindow(applicationId)}>
            <div className={classes.iconWrapper}>
                <img src={iconSrc} style={{ transform: `scale(${scale ? scale : 1})` }} draggable={false} />
            </div>
            <div className={classes.nameWrapper}>
                {name}
            </div>
        </div>
    );
};

export default desktopIcon;
