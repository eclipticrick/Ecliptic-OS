import * as React from 'react';
import * as classes from './Background.module.scss';
import {BackgroundType, IBackground} from '../../../store/reducers/desktop';
import DesktopContextMenu from '../../ContextMenu/specific/DesktopContextMenu/DesktopContextMenu';

export interface IBackgroundProps {
    background: IBackground
    taskbarHeight: number
}

const background = ({ taskbarHeight, background: { type, value } }: IBackgroundProps) => (
        <div className={classes.root} style={{
            background: type === BackgroundType.IMAGE ? `url(${value}) no-repeat center center / cover` : null,
            backgroundColor: type === BackgroundType.COLOR ? value : null,
            height: `calc(100% + ${taskbarHeight}px)`
        }}>
            <DesktopContextMenu/>
        </div>
);

export default background;
