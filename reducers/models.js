//Actions describe the fact that something happened
//but don’t specify how the application’s state changes in response. 
//This is the job of a reducer (c)

import { LOAD_MODELS, LOAD_MODELS_SUCCESS, LOAD_MODELS_FAIL, ADD_MODEL, UPDATE_MODEL, DELETE_MODEL } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
  // hydrated: false,
  loaded: false,
  data: []
};
let index;

export default function models(state = initialState, action) {

  switch (action.type) {

    case ADD_MODEL:

      return {...state,
          data: [...state.data, action.model]
      };

    case UPDATE_MODEL:
      index = _.findIndex(state.data, function(model) { return model.id === action.model.id; });
      if (index !== -1) {
        return {...state,
          data: [
            ...state.data.slice(0, index),
            // Copy the object before mutating
            Object.assign({}, state.data[index], action.model),
            ...state.data.slice(index + 1)
          ]
        };
      } else {
        return state;
      }
      /* falls through */

    case DELETE_MODEL:
      index = _.findIndex(state.data, function(model) { return model.id === action.model.id; });

      if (index !== -1) {
        state.data.splice(index, 1);
        return {...state,
          data: [
            ...state.data
          ]
        };
      } else {
        return state;
      }
      /* falls through */

    case LOAD_MODELS:
      return {...state,
        loading: true
      };

    case LOAD_MODELS_SUCCESS:
      console.log(action.result);
      return {...state,
        loading: false,
        loaded: true,
        data: action.result
      };

    case LOAD_MODELS_FAIL:
      return {...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data]
      };

    default:
      return state;
  }
}
