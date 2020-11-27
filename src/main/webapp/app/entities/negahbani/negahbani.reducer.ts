import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INegahbani, defaultValue } from 'app/shared/model/negahbani.model';

export const ACTION_TYPES = {
  FETCH_NEGAHBANI_LIST: 'negahbani/FETCH_NEGAHBANI_LIST',
  FETCH_NEGAHBANI: 'negahbani/FETCH_NEGAHBANI',
  CREATE_NEGAHBANI: 'negahbani/CREATE_NEGAHBANI',
  UPDATE_NEGAHBANI: 'negahbani/UPDATE_NEGAHBANI',
  DELETE_NEGAHBANI: 'negahbani/DELETE_NEGAHBANI',
  RESET: 'negahbani/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INegahbani>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type NegahbaniState = Readonly<typeof initialState>;

// Reducer

export default (state: NegahbaniState = initialState, action): NegahbaniState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NEGAHBANI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NEGAHBANI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NEGAHBANI):
    case REQUEST(ACTION_TYPES.UPDATE_NEGAHBANI):
    case REQUEST(ACTION_TYPES.DELETE_NEGAHBANI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NEGAHBANI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NEGAHBANI):
    case FAILURE(ACTION_TYPES.CREATE_NEGAHBANI):
    case FAILURE(ACTION_TYPES.UPDATE_NEGAHBANI):
    case FAILURE(ACTION_TYPES.DELETE_NEGAHBANI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEGAHBANI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEGAHBANI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NEGAHBANI):
    case SUCCESS(ACTION_TYPES.UPDATE_NEGAHBANI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NEGAHBANI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/negahbanis';

// Actions

export const getEntities: ICrudGetAllAction<INegahbani> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NEGAHBANI_LIST,
  payload: axios.get<INegahbani>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<INegahbani> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NEGAHBANI,
    payload: axios.get<INegahbani>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<INegahbani> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NEGAHBANI,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INegahbani> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NEGAHBANI,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INegahbani> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NEGAHBANI,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
