import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import promiseMiddleware from '../middleware/promiseMiddleware';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promiseMiddleware, syncHistory(browserHistory))
  );
}
