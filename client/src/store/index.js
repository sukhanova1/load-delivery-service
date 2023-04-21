import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import app from './app/reduser';
import user from './user/reducer';
import trucks from './trucks/reducer';
import loads from './loads/reducer';
import { userWatcher } from './user/sagas';

const reducers = combineReducers({
	app,
	user,
	loads,
	trucks,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState) =>
	createStore(
		reducers,
		preloadedState,
		composeEnhancer(applyMiddleware(sagaMiddleware))
	);

const store = configureStore({});

function* rootSaga() {
	// yield all(combineWatchers(userWatcher));
}

sagaMiddleware.run(userWatcher);

export default store;
