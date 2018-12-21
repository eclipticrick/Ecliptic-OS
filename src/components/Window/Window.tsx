import * as React from 'react';
import * as classes from './Window.module.scss';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

import * as iconSrc from '../../assets/images/windows-logo.svg';
import {Icon} from '@material-ui/core';

interface IWindowProps {
    title: string
    minHeight?: number
    minWidth?: number
    children: any // TODO: fix this with a react-component interface?
}

const window = ({ title, minHeight, minWidth, children }: IWindowProps) => (
    <Draggable defaultClassName={classes.root} handle={`.${classes.titleBar}`} bounds='parent'>
        <Resizable enable={{ bottom: true, bottomRight: true, right: true }}
                   minHeight={minHeight || 250}
                   minWidth={minWidth || 250}
                   defaultSize={{
                       width: minHeight || 250,
                       height: minWidth || 250,
                   }}
            // onResizeStop={(e, direction, ref, d) => {
            //     props.setTaskbarHeight(height + d.height);
            // }}
        >

            <div className={classes.titleBar}>

                <div className={classes.left}>
                    <img src={iconSrc} />
                    <span className={classes.title}>{title}</span>
                </div>
                <div className={classes.right}>
                    <button type='button' className={classes.minimize}>
                        <Icon className={classes.icon}>minimize</Icon>
                    </button>
                    <button type='button' className={classes.maximize}>
                        <Icon className={classes.icon}>fullscreen</Icon>
                    </button>
                    <button type='button' className={classes.close}>
                        <Icon className={classes.icon}>close</Icon>
                    </button>
                </div>

            </div>

            <div className={classes.content}>
                { children }
            </div>
        </Resizable>
    </Draggable>
);

export default window;
