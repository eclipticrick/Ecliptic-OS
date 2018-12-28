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
