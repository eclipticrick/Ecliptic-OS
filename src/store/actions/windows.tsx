import Actions from '../actionTypes';
import {ApplicationId, IApplication} from '../../appdata/applications';
// import {IPopupInstance} from '../../apptypings/window';

export const openWindow = (application: IApplication) => ({
    type: Actions.WINDOWS_____OPEN,
    payload: { application }
});

export const openPopup = (popup: IApplication) => ({
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
