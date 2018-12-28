import * as React from 'react';
import * as classes from './StartMenuTile.module.scss';
import {ApplicationId} from '../../../appdata/applications';
import applications from '../../../appdata/applications';
import {Button} from '@material-ui/core';

export interface IStartMenuTileProps {
    applicationId: ApplicationId
    closeStartMenu: () => void
    openWindow: (applicationId: ApplicationId) => void
}

const startMenuTile = ({applicationId, closeStartMenu, openWindow}: IStartMenuTileProps) => {
    const application = applications.find(app => app.id === applicationId);
    const onClickHandler = () => {
        closeStartMenu();
        openWindow(applicationId);
    };
    return (
        <Button size='small' className={classes.root} onClick={onClickHandler}>
            <img className={classes.icon} src={application.icon.src}/><span>{application.icon.name}</span>
        </Button>
    )
};

export default startMenuTile;
