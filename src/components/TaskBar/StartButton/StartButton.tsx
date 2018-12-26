import * as React from 'react';
import * as classes from './StartButton.module.scss';
import {Button} from '@material-ui/core';
import * as windowsLogoSrc from '../../../assets/images/windows-logo.svg';

export interface IStartButtonProps {
    taskBarHeight: number
}

const startButton = ({taskBarHeight}: IStartButtonProps) => (
    <Button className={classes.root} aria-label='Start' style={{ borderRadius: `0 ${taskBarHeight / 2}px ${taskBarHeight / 2}px 0` }}>
        {/*<Icon className={classNames(classes.icon, 'fab fa-windows')}/>*/}
        <img src={windowsLogoSrc}/>
    </Button>
);

export default startButton;
