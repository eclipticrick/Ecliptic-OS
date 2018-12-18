import Actions, {IAction} from '../../actionTypes';
import functions from './functions';

export interface IReducerConfig {
    taskbar: {
        height: number
    }
}

const initialState: IReducerConfig = {
    taskbar: {
        height: 30
    }
};

const REDUCER = ( state: IReducerConfig = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.CONFIG_____SET_TASKBAR_HEIGHT : return functions.setTaskbarHeight(state, action);
    }
    return state;
};

export default REDUCER;
