import {IReducerDesktop} from './index';
import {IAction} from '../../actionTypes';

export default {

    addShortcut: (oldState: IReducerDesktop, action: IAction): IReducerDesktop => {
        const { applicationId } = action.payload;

        const shortcuts = [...oldState.shortcuts];
        shortcuts.push(applicationId);

        return {
            ...oldState,
            shortcuts
        };
    },
    removeShortcut: (oldState: IReducerDesktop, action: IAction): IReducerDesktop => {
        const { applicationId } = action.payload;

        const shortcuts = [...oldState.shortcuts];
        shortcuts.filter(id => id !== applicationId);

        return {
            ...oldState,
            shortcuts
        };
    }

}
