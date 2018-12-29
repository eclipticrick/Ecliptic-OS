import Actions from '../actionTypes';
import {ApplicationId} from '../../appdata/applications';

export const setTaskbarHeight = (height: number) => ({
    type: Actions.TASKBAR_____SET_HEIGHT,
    payload: { height }
});

export const setQuickAccessWidth = (width: number) => ({
    type: Actions.TASKBAR_____SET_QUICK_ACCESS_WIDTH,
    payload: { width }
});

export const addQuickAccessShortcut = (applicationId: ApplicationId) => ({
    type: Actions.TASKBAR_____QUICKACCESS_ADD_SHORTCUT,
    payload: { applicationId }
});
export const removeQuickAccessShortcut = (applicationId: ApplicationId) => ({
    type: Actions.TASKBAR_____QUICKACCESS_REMOVE_SHORTCUT,
    payload: { applicationId }
});
