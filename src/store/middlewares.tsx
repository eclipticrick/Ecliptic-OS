import thunk from 'redux-thunk';
import { Action, applyMiddleware } from 'redux';

const DEBUG_DISPATCHERS = false;
const REMEMBER_STATE    = true;

const logger: any = (store: any) => (next: any) => (action: Action) => {
    const result = next(action);
    if (DEBUG_DISPATCHERS) {
        console.info(`[Middleware] Dispatching '${action.type}', resulting state:`, store.getState());
    }
    return result;
};

const localStorageSaver: any = (store: any) => (next: any) => (action: Action) => {
    const result = next(action);
    if (REMEMBER_STATE) {
        localStorage.setItem('state', JSON.stringify(store.getState()));
    }
    return result;
};

export default applyMiddleware(logger, localStorageSaver, thunk);
