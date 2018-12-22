import {IReducerWindows} from './index';
import {IAction} from '../../actionTypes';
import {IWindow} from '../../../appdata/window';

export default {

    open: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        let window: IWindow = windows.find(w => w.applicationId === applicationId);

        if (!window) {
            window = {
                applicationId,
                maximized: false,
                minimized: false
            };
        } else {

            // this: return this.select(oldState, action)
            // or:
            windows = windows.filter(w => w.applicationId !== applicationId);
            window.minimized = false;
        }
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    close: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        windows = windows.filter(w => w.applicationId !== applicationId);

        return {
            ...oldState,
            windows
        };
    },
    select: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        const window = windows.find(w => w.applicationId === applicationId);
        window.minimized = false;
        windows = windows.filter(w => w.applicationId !== applicationId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    minimize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        const window = windows.find(w => w.applicationId === applicationId);
        window.minimized = true;
        windows = windows.filter(w => w.applicationId !== applicationId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    maximize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        const window = windows.find(w => w.applicationId === applicationId);
        window.maximized = true;
        windows = windows.filter(w => w.applicationId !== applicationId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    normalize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        let windows = [...oldState.windows];
        const window = windows.find(w => w.applicationId === applicationId);
        window.maximized = false;
        windows = windows.filter(w => w.applicationId !== applicationId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    }

}
