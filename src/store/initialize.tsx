import { combineReducers, compose, createStore } from 'redux';
import configReducer, {IReducerConfig} from './reducers/config/index';
import userReducer, {IReducerUser} from './reducers/user/index';
import desktopReducer, {IReducerDesktop} from './reducers/desktop/index';
import windowsReducer, {IReducerWindows} from './reducers/windows/index';
import middlewares from './middlewares';

export interface IStore {
    config: IReducerConfig
    user: IReducerUser
    desktop: IReducerDesktop
    windows: IReducerWindows
}

const rootReducer = combineReducers({
    config: configReducer,
    user: userReducer,
    desktop: desktopReducer,
    windows: windowsReducer
});

// const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(middlewares));
