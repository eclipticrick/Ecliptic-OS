import {IReducerDesktop} from './index';
import {IAction} from '../../actionTypes';

import * as background0Src from '../../../assets/images/wallpapers/default.jpg';
import * as background1Src from '../../../assets/images/wallpapers/custom-1.jpg';
import * as background2Src from '../../../assets/images/wallpapers/custom-2.jpg';
import * as background3Src from '../../../assets/images/wallpapers/custom-3.jpg';

export default {

    addShortcut: (oldState: IReducerDesktop, action: IAction): IReducerDesktop => {
        const { applicationId } = action.payload;

        const shortcuts = [...oldState.shortcuts];
        if (!shortcuts.find(appId => appId === applicationId)) {
            shortcuts.push(applicationId);
        }

        return {
            ...oldState,
            shortcuts
        };
    },
    removeShortcut: (oldState: IReducerDesktop, action: IAction): IReducerDesktop => {
        const { applicationId } = action.payload;

        const shortcuts = [...oldState.shortcuts].filter(id => id !== applicationId);

        return {
            ...oldState,
            shortcuts
        };
    },
    toggleBackground: (oldState: IReducerDesktop): IReducerDesktop => {
        const backgroundImages = [
            background0Src,
            background1Src,
            background2Src,
            background3Src
        ];
        const background = {...oldState.background};
        let i = backgroundImages.indexOf(background.value);
        if (i >= backgroundImages.length) {
            i = 0
        } else {
            i++
        }
        background.value = backgroundImages[i];
        return {
            ...oldState,
            background
        };
    }

}
