import * as React from 'react';
import * as classes from '../StartMenu.module.scss';
import {ApplicationId, IApplication} from '../../../appdata/applications';
import StartMenuTile from './StartMenuTile/StartMenuTile';
import {OuterContextType} from '../../ContextMenu/specific/ApplicationContextMenu/ApplicationContextMenu';

export interface IStartMenuTileProps {
    applicationIds: ApplicationId[]
    context: OuterContextType
    closeStartMenu: () => void
    openWindow: (application: IApplication) => void
}

const startMenuTileList = ({applicationIds, closeStartMenu, openWindow, context}: IStartMenuTileProps) => {

    return (
        <>
            {applicationIds.map(appId => (
                <React.Fragment key={`start-menu-tile-${context}-${appId}`}>
                    <div className={classes.tileWrapper}>
                        <StartMenuTile closeStartMenu={closeStartMenu}
                                       openWindow={openWindow}
                                       context={context}
                                       applicationId={appId} />
                    </div>
                </React.Fragment>
            ))}
        </>
    )
};

export default startMenuTileList;
