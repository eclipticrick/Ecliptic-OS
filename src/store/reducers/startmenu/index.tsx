import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {ApplicationId} from '../../../appdata/applications';

export interface IReducerStartMenu {
    opened: boolean,
    pinnedApplications: ApplicationId[],
    recentApplications: ApplicationId[]
}

const initialState: IReducerStartMenu = {
    opened: false,
    pinnedApplications: [
        ApplicationId.INTERNET_EXPLORER,
        ApplicationId.CALCULATOR,
    ],
    recentApplications: []
};

const REDUCER = ( state: IReducerStartMenu = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.STARTMENU_____OPEN : return functions.open(state);
        case Actions.STARTMENU_____CLOSE : return functions.close(state);
        case Actions.STARTMENU_____ADD_RECENT_APPLICATION : return functions.addRecentApplication(state, action);
        case Actions.STARTMENU_____PIN_APPLICATION : return functions.pinApplication(state, action);
        case Actions.STARTMENU_____UNPIN_APPLICATION : return functions.unpinApplication(state, action);
    }
    return state;
};

export default REDUCER;
