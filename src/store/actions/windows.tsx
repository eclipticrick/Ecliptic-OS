import Actions from '../actionTypes';
import {IApplication} from '../../appdata/applications';
import {WindowInstanceType} from "../../apptypings/window";

export const openWindow = (application: IApplication, type?: WindowInstanceType) => ({
    type: Actions.WINDOWS_____OPEN,
    payload: { application, type }
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

export const updateWindowTitle = (instanceId: number, title: string) => ({
    type: Actions.WINDOWS_____UPDATE_TITLE,
    payload: { instanceId, title }
});
