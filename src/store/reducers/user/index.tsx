import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import * as userImageSrc from '../../../assets/images/admin.jpg';

export interface IReducerUser {
    isLoggedIn: boolean
    name: string
    imageSrc: string
}

const initialState: IReducerUser = {
    isLoggedIn: false,
    name: 'Admin',
    imageSrc: userImageSrc
};

const REDUCER = ( state: IReducerUser = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.USER_____LOGIN : return functions.login(state, action);
    }
    return state;
};

export default REDUCER;
