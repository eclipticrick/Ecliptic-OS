import * as React from 'react';
import * as classes from './StartMenuTile.module.scss';
import {ApplicationId} from '../../../appdata/applications';
import applications from '../../../appdata/applications';
import {Button} from '@material-ui/core';
import ApplicationContextMenu, {OuterContextType} from '../../ContextMenu/specific/ApplicationContextMenu';

export interface IStartMenuTileProps {
    context: OuterContextType
    applicationId: ApplicationId
    closeStartMenu: () => void
    openWindow: (applicationId: ApplicationId) => void
}

const startMenuTile = ({applicationId, closeStartMenu, openWindow, context}: IStartMenuTileProps) => {
    const application = applications.find(app => app.id === applicationId);
    const onClickHandler = () => {
        closeStartMenu();
        openWindow(applicationId);
    };
    return (
        <ApplicationContextMenu applicationId={applicationId} context={context}>
        <Button size='small' className={classes.root} onClick={onClickHandler}>
                <img className={classes.icon} src={application.icon.src}/><span>{application.icon.name}</span>
        </Button>
</ApplicationContextMenu>
    )
};

export default startMenuTile;
