import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShahr, defaultValue } from 'app/shared/model/shahr.model';

export const ACTION_TYPES = {
  FETCH_SHAHR_LIST: 'shahr/FETCH_SHAHR_LIST',
  FETCH_SHAHR: 'shahr/FETCH_SHAHR',
  CREATE_SHAHR: 'shahr/CREATE_SHAHR',
  UPDATE_SHAHR: 'shahr/UPDATE_SHAHR',
  DELETE_SHAHR: 'shahr/DELETE_SHAHR',
  RESET: 'shahr/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShahr>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ShahrState = Readonly<typeof initialState>;

// Reducer

export default (state: ShahrState = initialState, action): ShahrState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHAHR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHAHR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SHAHR):
    case REQUEST(ACTION_TYPES.UPDATE_SHAHR):
    case REQUEST(ACTION_TYPES.DELETE_SHAHR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SHAHR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHAHR):
    case FAILURE(ACTION_TYPES.CREATE_SHAHR):
    case FAILURE(ACTION_TYPES.UPDATE_SHAHR):
    case FAILURE(ACTION_TYPES.DELETE_SHAHR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHAHR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHAHR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHAHR):
    case SUCCESS(ACTION_TYPES.UPDATE_SHAHR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHAHR):
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

const apiUrl = 'api/shahrs';

// Actions

export const getEntities: ICrudGetAllAction<IShahr> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SHAHR_LIST,
  payload: axios.get<IShahr>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IShahr> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHAHR,
    payload: axios.get<IShahr>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IShahr> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHAHR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShahr> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHAHR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShahr> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHAHR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
