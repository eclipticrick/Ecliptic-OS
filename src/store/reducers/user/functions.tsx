import {IReducerUser} from './index';
import {IAction} from '../../actionTypes';

export default {

    login: (oldState: IReducerUser, action: IAction): IReducerUser => {
        return {
            ...oldState,
            isLoggedIn: true
        };
    }

}
