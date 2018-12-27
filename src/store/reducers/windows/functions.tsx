import {IReducerWindows} from './index';
import {IAction} from '../../actionTypes';
import {IWindowInstance} from '../../../appdata/window';

export default {

    open: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;
        const uniqueInstanceCounter = oldState.uniqueInstanceCounter + 1;

        const windows: IWindowInstance[] = [...oldState.windows];

        const window: IWindowInstance = {
            instanceId: uniqueInstanceCounter,
            applicationId,
            maximized: false,
            minimized: false
        };
        windows.push(window);

        return {
            ...oldState,
            uniqueInstanceCounter,
            windows
        };
    },
    openPopup: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { popup } = action.payload;
        return {
            ...oldState,
            popup
        };
    },
    closePopUp: (oldState: IReducerWindows): IReducerWindows => {
        return {
            ...oldState,
            popup: null
        };
    },
    close: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { instanceId } = action.payload;

        let windows = [...oldState.windows];
        windows = windows.filter(w => w.instanceId !== instanceId);

        return {
            ...oldState,
            windows
        };
    },
    select: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { instanceId } = action.payload;

        let windows = [...oldState.windows];
        const window: IWindowInstance = {...windows.find(w => w.instanceId === instanceId)}; // maybe dont copy?
        window.minimized = false;
        windows = windows.filter(w => w.instanceId !== instanceId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    minimize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { instanceId } = action.payload;

        let windows = [...oldState.windows];
        const window: IWindowInstance = {...windows.find(w => w.instanceId === instanceId)};
        window.minimized = true;
        windows = windows.filter(w => w.instanceId !== instanceId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    maximize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { instanceId } = action.payload;

        let windows = [...oldState.windows];
        const window: IWindowInstance = {...windows.find(w => w.instanceId === instanceId)};
        window.maximized = true;
        windows = windows.filter(w => w.instanceId !== instanceId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    },
    normalize: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { instanceId } = action.payload;

        let windows = [...oldState.windows];
        const window: IWindowInstance = {...windows.find(w => w.instanceId === instanceId)};
        window.maximized = false;
        windows = windows.filter(w => w.instanceId !== instanceId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    }

}
