import * as APIUtils from '../utils/APIUtils';
import * as types from '../constants/ActionTypes';

 // Redux actions with pure reducers

export function loadModels() {
  return {
    types: [types.LOAD_MODELS, types.LOAD_MODELS_SUCCESS, types.LOAD_MODELS_FAIL],
    promise: APIUtils.loadModels()
  };
};

export function addModel(model) {
  return {
    type: types.ADD_MODEL,
    model
  };
}

export function updateModel(model) {
  return {
    type: types.UPDATE_MODEL,
    model
  };
}

export function deleteModel(model) {
  return {
    type: types.DELETE_MODEL,
    model
  };
}
 
