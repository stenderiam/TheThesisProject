import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../containers/DevTools';
import promiseMiddleware from '../middleware/promiseMiddleware';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promiseMiddleware, reduxRouterMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
