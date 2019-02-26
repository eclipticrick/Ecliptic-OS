import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import * as userImageSrc from '../../../assets/images/admin.jpg';
import {EclipticFilePermissionGroup} from "../../../apptypings/filesystem";
import {User} from "../../../apptypings/user";

export interface IReducerUser extends User{}

const initialState: IReducerUser = {
    username: 'rick',
    isLoggedIn: false,
    name: 'Ecliptic Rick',
    imageSrc: userImageSrc,
    groups: [EclipticFilePermissionGroup.user]
};

const REDUCER = ( state: IReducerUser = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.USER_____LOGIN : return functions.login(state, action);
    }
    return state;
};

export default REDUCER;
