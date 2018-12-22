import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {ApplicationId} from '../../../appdata/applications';

export interface IReducerDesktop {
    background: {
        type: string
        value: string
    }

    // A list of application id's to be shown as icons on the desktop
    shortcuts: ApplicationId[]
}

const initialState: IReducerDesktop = {
    background: {
        type: 'image',
        value: 'temp'
    },
    shortcuts: [
        ApplicationId.INTERNET_EXPLORER,
        ApplicationId.WORD,
        ApplicationId.GOOGLE_CHROME
    ]
};

const REDUCER = ( state: IReducerDesktop = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.DESKTOP_____ADD_SHORTCUT : return functions.addShortcut(state, action);
        case Actions.DESKTOP_____REMOVE_SHORTCUT : return functions.removeShortcut(state, action);
    }
    return state;
};

export default REDUCER;
