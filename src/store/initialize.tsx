import { combineReducers, compose, createStore } from 'redux';
import configReducer, {IReducerConfig} from './reducers/config/index';
import userReducer, {IReducerUser} from './reducers/user/index';
import middlewares from './middlewares';

export interface IStore {
    config: IReducerConfig,
    user: IReducerUser
}

const rootReducer = combineReducers({
    config: configReducer,
    user: userReducer
});

// const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(middlewares));
