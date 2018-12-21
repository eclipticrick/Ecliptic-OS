import * as React from 'react';
import * as classes from './Background.module.scss';
import * as backgroundSrc from '../../../assets/images/wallpapers/default.jpg';

export interface IBackgroundProps {
    taskbarHeight: number
}

const background = ({ taskbarHeight }: IBackgroundProps) => (
    <div className={classes.root} style={{
        background: `url(${backgroundSrc}) no-repeat center center / cover`,
        height: `calc(100% + ${taskbarHeight}px)`
    }}/>
);

export default background;
