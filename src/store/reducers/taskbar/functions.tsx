import {IReducerTaskBar} from './index';
import {IAction} from '../../actionTypes';

export default {

    setHeight: (oldState: IReducerTaskBar, action: IAction & { height: number }): IReducerTaskBar => {
        const { height } = action;

        return {
            ...oldState,
            height
        };
    },
    setQuickAccesWidth: (oldState: IReducerTaskBar, action: IAction & { width: number }): IReducerTaskBar => {
        const { width } = action;

        return {
            ...oldState,
            quickAccessWidth: width
        };
    }

}
