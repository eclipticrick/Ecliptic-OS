import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {ApplicationId} from '../../../appdata/applications';
import * as backgroundSrc from '../../../assets/images/wallpapers/default.jpg';

export enum BackgroundType {
    IMAGE = 'IMAGE',
    COLOR = 'COLOR'
}

export interface IBackground {
    type: BackgroundType,
    value: string
}

export interface IReducerDesktop {
    background: IBackground

    // A list of application id's to be shown as icons on the desktop
    shortcuts: ApplicationId[]
}

const initialState: IReducerDesktop = {
    background: {
        type: BackgroundType.IMAGE,
        value: backgroundSrc
    },
    shortcuts: [
        ApplicationId.INTERNET_EXPLORER,
        ApplicationId.CALCULATOR,
        ApplicationId.COMPUTER
    ]
};

const REDUCER = ( state: IReducerDesktop = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.DESKTOP_____ADD_SHORTCUT : return functions.addShortcut(state, action);
        case Actions.DESKTOP_____REMOVE_SHORTCUT : return functions.removeShortcut(state, action);
        case Actions.DESKTOP_____TOGGLE_BACKGROUND : return functions.toggleBackground(state);
    }
    return state;
};

export default REDUCER;
