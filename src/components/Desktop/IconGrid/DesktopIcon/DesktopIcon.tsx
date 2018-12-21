import * as React from 'react';
import * as classes from './DesktopIcon.module.scss';

export interface IDesktopIconProps {
    iconSrc: string
    name: string
    scale?: number
}

const desktopIcon = ({ iconSrc, name, scale }: IDesktopIconProps) => (

    <div className={classes.root}>
        <div className={classes.iconWrapper}>
            <img src={iconSrc} style={{ transform: `scale(${scale ? scale : 1})` }} />
        </div>
        <div className={classes.nameWrapper}>
            {name}
        </div>
    </div>
);

export default desktopIcon;
