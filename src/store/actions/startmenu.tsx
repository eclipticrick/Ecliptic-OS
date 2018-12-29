import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';

export const openStartMenu = () => ({
    type: Actions.STARTMENU_____OPEN
});

export const closeStartMenu = () => ({
    type: Actions.STARTMENU_____CLOSE
});

export const addRecentApplicationToStartMenu = (applicationId: ApplicationId) => ({
    type: Actions.STARTMENU_____ADD_RECENT_APPLICATION,
    payload: { applicationId }
});

export const pinApplicationToStartMenu = (applicationId: ApplicationId) => ({
    type: Actions.STARTMENU_____PIN_APPLICATION,
    payload: { applicationId }
});

export const unpinApplicationToStartMenu = (applicationId: ApplicationId) => ({
    type: Actions.STARTMENU_____UNPIN_APPLICATION,
    payload: { applicationId }
});
