import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';

export const addDesktopShortcut = (applicationId: ApplicationId) => ({
    type: Actions.DESKTOP_____ADD_SHORTCUT,
    payload: { applicationId }
});

export const removeDesktopShortcut = (applicationId: ApplicationId) => ({
    type: Actions.DESKTOP_____REMOVE_SHORTCUT,
    payload: { applicationId }
});
