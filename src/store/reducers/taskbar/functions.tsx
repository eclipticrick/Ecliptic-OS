import {IReducerTaskBar} from './index';
import {IAction} from '../../actionTypes';

export default {

    setHeight: (oldState: IReducerTaskBar, action: IAction & { height: number }): IReducerTaskBar => {
        const { height } = action.payload;

        return {
            ...oldState,
            height
        };
    },
    setQuickAccesWidth: (oldState: IReducerTaskBar, action: IAction & { width: number }): IReducerTaskBar => {
        const { width } = action.payload;

        return {
            ...oldState,
            quickAccessWidth: width
        };
    },
    addQuickAccesShortcut: (oldState: IReducerTaskBar, action: IAction): IReducerTaskBar => {
        const { applicationId } = action.payload;

        const quickAccessShortcuts = [...oldState.quickAccessShortcuts];
        if (!quickAccessShortcuts.find(appId => appId === applicationId)) {
            quickAccessShortcuts.push(applicationId);
        }

        return {
            ...oldState,
            quickAccessShortcuts
        };
    },
    removeQuickAccesShortcut: (oldState: IReducerTaskBar, action: IAction): IReducerTaskBar => {
        const { applicationId } = action.payload;

        const quickAccessShortcuts = [...oldState.quickAccessShortcuts].filter(id => id !== applicationId);

        return {
            ...oldState,
            quickAccessShortcuts
        };
    }

}
