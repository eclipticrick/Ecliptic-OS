import Actions from '../actionTypes';

export const addDesktopShortcut = (applicationId: string) => ({
    type: Actions.DESKTOP_____ADD_SHORTCUT,
    payload: { applicationId }
});

export const removeDesktopShortcut = (applicationId: string) => ({
    type: Actions.DESKTOP_____REMOVE_SHORTCUT,
    payload: { applicationId }
});
