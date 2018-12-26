import Actions from '../actionTypes';

export const setTaskbarHeight = (height: number) => ({
    type: Actions.TASKBAR_____SET_HEIGHT,
    height
});

export const setQuickAccessWidth = (width: number) => ({
    type: Actions.TASKBAR_____SET_QUICK_ACCESS_WIDTH,
    width
});
