import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';

export const openWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____OPEN,
    payload: { applicationId }
});

export const closeWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____CLOSE,
    payload: { applicationId }
});

export const selectWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____SELECT,
    payload: { applicationId }
});

export const minimizeWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____MINIMIZE,
    payload: { applicationId }
});

export const maximizeWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____MAXIMIZE,
    payload: { applicationId }
});

export const normalizeWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____NORMALIZE,
    payload: { applicationId }
});
