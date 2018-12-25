import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {IWindowInstance} from '../../../appdata/window';

export interface IReducerWindows {
    windows: IWindowInstance[]
}

const initialState: IReducerWindows = {
    windows: []
};

const REDUCER = ( state: IReducerWindows = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.WINDOWS_____OPEN : return functions.open(state, action);
        case Actions.WINDOWS_____CLOSE : return functions.close(state, action);
        case Actions.WINDOWS_____SELECT : return functions.select(state, action);
        case Actions.WINDOWS_____MINIMIZE : return functions.minimize(state, action);
        case Actions.WINDOWS_____MAXIMIZE : return functions.maximize(state, action);
        case Actions.WINDOWS_____NORMALIZE : return functions.normalize(state, action);
    }
    return state;
};

export default REDUCER;
