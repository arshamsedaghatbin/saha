import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDaraje, defaultValue } from 'app/shared/model/daraje.model';

export const ACTION_TYPES = {
  FETCH_DARAJE_LIST: 'daraje/FETCH_DARAJE_LIST',
  FETCH_DARAJE: 'daraje/FETCH_DARAJE',
  CREATE_DARAJE: 'daraje/CREATE_DARAJE',
  UPDATE_DARAJE: 'daraje/UPDATE_DARAJE',
  DELETE_DARAJE: 'daraje/DELETE_DARAJE',
  RESET: 'daraje/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDaraje>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DarajeState = Readonly<typeof initialState>;

// Reducer

export default (state: DarajeState = initialState, action): DarajeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DARAJE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DARAJE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DARAJE):
    case REQUEST(ACTION_TYPES.UPDATE_DARAJE):
    case REQUEST(ACTION_TYPES.DELETE_DARAJE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DARAJE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DARAJE):
    case FAILURE(ACTION_TYPES.CREATE_DARAJE):
    case FAILURE(ACTION_TYPES.UPDATE_DARAJE):
    case FAILURE(ACTION_TYPES.DELETE_DARAJE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DARAJE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DARAJE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DARAJE):
    case SUCCESS(ACTION_TYPES.UPDATE_DARAJE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DARAJE):
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

const apiUrl = 'api/darajes';

// Actions

export const getEntities: ICrudGetAllAction<IDaraje> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DARAJE_LIST,
  payload: axios.get<IDaraje>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDaraje> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DARAJE,
    payload: axios.get<IDaraje>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDaraje> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DARAJE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDaraje> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DARAJE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDaraje> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DARAJE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
