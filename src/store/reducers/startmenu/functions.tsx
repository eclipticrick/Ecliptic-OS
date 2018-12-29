import {IReducerStartMenu} from './index';
import {IAction} from '../../actionTypes';

export default {

    open: (oldState: IReducerStartMenu): IReducerStartMenu => {
        return {
            ...oldState,
            opened: true
        };
    },
    close: (oldState: IReducerStartMenu): IReducerStartMenu => {
        return {
            ...oldState,
            opened: false
        };
    },
    addRecentApplication: (oldState: IReducerStartMenu, action: IAction): IReducerStartMenu => {
        const { applicationId } = action.payload;
        const recentApplications = [...oldState.recentApplications].filter(appId => appId !== applicationId);
        recentApplications.unshift(applicationId);

        return {
            ...oldState,
            recentApplications
        };
    },
    pinApplication: (oldState: IReducerStartMenu, action: IAction): IReducerStartMenu => {
        const { applicationId } = action.payload;

        const pinnedApplications = [...oldState.pinnedApplications];
        if (!pinnedApplications.find(appId => appId === applicationId)) {
            pinnedApplications.push(applicationId);
        }

        return {
            ...oldState,
            pinnedApplications
        };
    },
    unpinApplication: (oldState: IReducerStartMenu, action: IAction): IReducerStartMenu => {
        const { applicationId } = action.payload;

        const pinnedApplications = [...oldState.pinnedApplications].filter(id => id !== applicationId);

        return {
            ...oldState,
            pinnedApplications
        };
    }
}
