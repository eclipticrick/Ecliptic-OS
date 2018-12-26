import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';
import {IPopUpInstance} from '../../appdata/window';

export const openWindow = (applicationId: ApplicationId) => ({
    type: Actions.WINDOWS_____OPEN,
    payload: { applicationId }
});

export const openPopup = (popup: IPopUpInstance) => ({
    type: Actions.WINDOWS_____OPEN_POPUP,
    payload: { popup }
});

export const closeWindow = (instanceId: number) => ({
    type: Actions.WINDOWS_____CLOSE,
    payload: { instanceId }
});

export const closePopup = () => ({
    type: Actions.WINDOWS_____CLOSE_POPUP
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
