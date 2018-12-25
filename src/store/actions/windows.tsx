import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';

export const openWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____OPEN,
    payload: { applicationId }
});

export const closeWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____CLOSE,
    payload: { instanceId }
});

export const selectWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____SELECT,
    payload: { instanceId }
});

export const minimizeWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____MINIMIZE,
    payload: { instanceId }
});

export const maximizeWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____MAXIMIZE,
    payload: { instanceId }
});

export const normalizeWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____NORMALIZE,
    payload: { instanceId }
});
