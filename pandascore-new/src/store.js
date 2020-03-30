import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import combineReducers from './reducer/root.reducer'
const loggerMiddleware = createLogger()
const store = createStore(
    combineReducers,
    applyMiddleware(
        ThunkMiddleware,
        loggerMiddleware
    )
)
export default (store);