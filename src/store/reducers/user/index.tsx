import Actions, {IAction} from '../../actionTypes';
import functions from './functions';

export interface IReducerUser {
    isLoggedIn: boolean
}

const initialState: IReducerUser = {
    isLoggedIn: false
};

const REDUCER = ( state: IReducerUser = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.USER_____LOGIN : return functions.login(state, action);
    }
    return state;
};

export default REDUCER;
