import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer as router } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

import * as reducers from './reducers';

const reducer = combineReducers({
    user: reducers.userReducer,
    router
})

const store = createStore(reducer, undefined, compose(window.devToolsExtension ? window.devToolsExtension() : f => f, applyMiddleware(thunk, routerMiddleware(history))));

export default store;