import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import models from './models';

const rootReducer = combineReducers({
  models,
  routing: router
});

export default rootReducer;
