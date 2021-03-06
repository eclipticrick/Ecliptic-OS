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
    addRecentApp: (oldState: IReducerStartMenu, action: IAction): IReducerStartMenu => {
        const { applicationId } = action.payload;
        const recentApplications = [...oldState.recentApplications].filter(appId => appId !== applicationId);
        recentApplications.unshift(applicationId);

        return {
            ...oldState,
            recentApplications
        };
    }

}
