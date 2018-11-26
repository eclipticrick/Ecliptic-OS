import thunk from 'redux-thunk';
import { Action, applyMiddleware } from 'redux';

const LOGGER_ACTIVE: boolean = true;

const logger: any = (store: any) => (next: any) => (action: Action) => {
    const result = next(action);
    if (LOGGER_ACTIVE) console.info(`[Middleware] Dispatching '${action.type}', resulting state:`, store.getState());
    return result;
};

export default applyMiddleware(logger, thunk);
