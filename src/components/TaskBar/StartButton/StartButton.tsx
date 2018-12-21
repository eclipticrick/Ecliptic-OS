import * as React from 'react';
import * as classes from './StartButton.module.scss';
import {Button} from '@material-ui/core';
import * as windowsLogoSrc from '../../../assets/images/windows-logo.svg';

const startButton = () => (
    <div className={classes.root}>
        <Button aria-label='Start'>
            {/*<Icon className={classNames(classes.icon, 'fab fa-windows')}/>*/}
            <img src={windowsLogoSrc}/>
        </Button>
    </div>
);

export default startButton;
