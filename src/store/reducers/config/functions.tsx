import {IReducerConfig} from './index';
import {IAction} from '../../actionTypes';

export default {

    setTaskbarHeight: (oldState: IReducerConfig, action: IAction & { height: number }): IReducerConfig => {
        const { height } = action;

        return {
            ...oldState,
            taskbar: {
                ...oldState.taskbar,
                height
            }
        };
    }

}
