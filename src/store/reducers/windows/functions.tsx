import {IReducerWindows} from './index';
import {IAction} from '../../actionTypes';

export default {

    open: (oldState: IReducerWindows, action: IAction): IReducerWindows => {
        const { window } = action.payload;
        return {
            ...oldState,
            windows: [
                ...oldState.windows,
                window
            ]
        };
    }

}
