import Actions, {IAction} from '../../actionTypes';
import functions from './functions';

export interface IReducerDesktop {
    background: {
        type: string
        value: string
    }

    // A list of application id's to be shown as icons on the desktop
    shortcuts: any[]
}

const initialState: IReducerDesktop = {
    background: {
        type: 'image',
        value: 'temp'
    },
    shortcuts: []
};

const REDUCER = ( state: IReducerDesktop = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.DESKTOP_____ADD_SHORTCUT : return functions.addShortcut(state, action);
        case Actions.DESKTOP_____REMOVE_SHORTCUT : return functions.removeShortcut(state, action);
    }
    return state;
};

export default REDUCER;
