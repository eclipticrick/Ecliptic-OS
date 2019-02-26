import { combineReducers, compose, createStore } from 'redux';
import taskbarReducer, {IReducerTaskBar} from './reducers/taskbar/index';
import startmenuReducer, {IReducerStartMenu} from './reducers/startmenu/index';
import userReducer, {IReducerUser} from './reducers/user/index';
import storageReducer, {IReducerStorage} from './reducers/storage/index';
import desktopReducer, {IReducerDesktop} from './reducers/desktop/index';
import windowsReducer, {IReducerWindows} from './reducers/windows/index';
import middlewares from './middlewares';

export interface IStore {
    taskbar: IReducerTaskBar
    startmenu: IReducerStartMenu
    user: IReducerUser
    storage: IReducerStorage
    desktop: IReducerDesktop
    windows: IReducerWindows
}

const rootReducer = combineReducers({
    taskbar: taskbarReducer,
    startmenu: startmenuReducer,
    user: userReducer,
    storage: storageReducer,
    desktop: desktopReducer,
    windows: windowsReducer
});

// const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(middlewares));
