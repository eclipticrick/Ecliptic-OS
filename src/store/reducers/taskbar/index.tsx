import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {ApplicationId} from '../../../appdata/applications';

export interface IReducerTaskBar {
    height: number
    quickAccessWidth: number
    quickAccessShortcuts: ApplicationId[]
}

const initialState: IReducerTaskBar = {
    height: 36,
    quickAccessWidth: 44,
    quickAccessShortcuts: [
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

const REDUCER = ( state: IReducerTaskBar = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.TASKBAR_____SET_HEIGHT : return functions.setHeight(state, action);
        case Actions.TASKBAR_____SET_QUICK_ACCESS_WIDTH : return functions.setQuickAccesWidth(state, action);
        case Actions.TASKBAR_____QUICKACCESS_ADD_SHORTCUT : return functions.addQuickAccesShortcut(state, action);
        case Actions.TASKBAR_____QUICKACCESS_REMOVE_SHORTCUT : return functions.removeQuickAccesShortcut(state, action);
    }
    return state;
};

export default REDUCER;
