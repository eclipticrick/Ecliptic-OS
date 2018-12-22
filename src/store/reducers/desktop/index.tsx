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
        value: 'temp' // TODO
    },
    shortcuts: [
        ApplicationId.INTERNET_EXPLORER,
        ApplicationId.LIME_WIRE,
        ApplicationId.OUTLOOK,
        ApplicationId.NOTEPAD,
        ApplicationId.TODO_LIST,
        ApplicationId.WHATSAPP,
        ApplicationId.CALCULATOR,
        ApplicationId.COMPUTER,
        ApplicationId.PAINT
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
