import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer.js'

import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger'

const logger = createLogger({});

const middleware = [thunk];

if(process.env.NODE_ENV != 'production'){
	middleware.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;