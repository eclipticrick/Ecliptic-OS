import Actions, {IAction} from '../../actionTypes';
import functions from './functions';

export interface IReducerWindows {
    windows: any[]
}

const initialState: IReducerWindows = {
    windows: []
};

const REDUCER = ( state: IReducerWindows = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.WINDOWS_____OPEN : return functions.open(state, action);
    }
    return state;
};

export default REDUCER;
