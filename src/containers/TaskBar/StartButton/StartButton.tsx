import * as React from 'react';
import * as classes from './StartButton.module.scss';
import classNames from 'classnames';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const startButton = () => (
    <div className={classes.root}>
        <Button aria-label='Start'>
            <Icon className={classNames(classes.icon, 'fab fa-windows')}/>
        </Button>
    </div>
);

export default startButton;
