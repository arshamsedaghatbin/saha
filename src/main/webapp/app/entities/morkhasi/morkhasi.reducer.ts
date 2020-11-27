import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMorkhasi, defaultValue } from 'app/shared/model/morkhasi.model';

export const ACTION_TYPES = {
  FETCH_MORKHASI_LIST: 'morkhasi/FETCH_MORKHASI_LIST',
  FETCH_MORKHASI: 'morkhasi/FETCH_MORKHASI',
  CREATE_MORKHASI: 'morkhasi/CREATE_MORKHASI',
  UPDATE_MORKHASI: 'morkhasi/UPDATE_MORKHASI',
  DELETE_MORKHASI: 'morkhasi/DELETE_MORKHASI',
  RESET: 'morkhasi/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMorkhasi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MorkhasiState = Readonly<typeof initialState>;

// Reducer

export default (state: MorkhasiState = initialState, action): MorkhasiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MORKHASI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MORKHASI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MORKHASI):
    case REQUEST(ACTION_TYPES.UPDATE_MORKHASI):
    case REQUEST(ACTION_TYPES.DELETE_MORKHASI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MORKHASI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MORKHASI):
    case FAILURE(ACTION_TYPES.CREATE_MORKHASI):
    case FAILURE(ACTION_TYPES.UPDATE_MORKHASI):
    case FAILURE(ACTION_TYPES.DELETE_MORKHASI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MORKHASI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MORKHASI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MORKHASI):
    case SUCCESS(ACTION_TYPES.UPDATE_MORKHASI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MORKHASI):
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

const apiUrl = 'api/morkhasis';

// Actions

export const getEntities: ICrudGetAllAction<IMorkhasi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MORKHASI_LIST,
  payload: axios.get<IMorkhasi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMorkhasi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MORKHASI,
    payload: axios.get<IMorkhasi>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMorkhasi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MORKHASI,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMorkhasi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MORKHASI,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMorkhasi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MORKHASI,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
