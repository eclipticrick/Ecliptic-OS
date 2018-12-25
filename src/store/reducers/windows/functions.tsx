import {IReducerWindows} from './index';
import {IAction} from '../../actionTypes';
import {IWindowInstance} from '../../../appdata/window';

export default {

    open: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { applicationId } = action.payload;

        const windows: IWindowInstance[] = [...oldState.windows];

        const window: IWindowInstance = {
            instanceId: windows.length + 1,
            applicationId,
            maximized: false,
            minimized: false
        };
        windows.push(window);

        return {
            ...oldState,
            windows
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
        const window = windows.find(w => w.instanceId === instanceId);
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
        const window = windows.find(w => w.instanceId === instanceId);
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
        const window = windows.find(w => w.instanceId === instanceId);
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
        const window = windows.find(w => w.instanceId === instanceId);
        window.maximized = false;
        windows = windows.filter(w => w.instanceId !== instanceId);
        windows.push(window);

        return {
            ...oldState,
            windows
        };
    }

}
