import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMantaghe, defaultValue } from 'app/shared/model/mantaghe.model';

export const ACTION_TYPES = {
  FETCH_MANTAGHE_LIST: 'mantaghe/FETCH_MANTAGHE_LIST',
  FETCH_MANTAGHE: 'mantaghe/FETCH_MANTAGHE',
  CREATE_MANTAGHE: 'mantaghe/CREATE_MANTAGHE',
  UPDATE_MANTAGHE: 'mantaghe/UPDATE_MANTAGHE',
  DELETE_MANTAGHE: 'mantaghe/DELETE_MANTAGHE',
  RESET: 'mantaghe/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMantaghe>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MantagheState = Readonly<typeof initialState>;

// Reducer

export default (state: MantagheState = initialState, action): MantagheState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MANTAGHE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MANTAGHE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MANTAGHE):
    case REQUEST(ACTION_TYPES.UPDATE_MANTAGHE):
    case REQUEST(ACTION_TYPES.DELETE_MANTAGHE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MANTAGHE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MANTAGHE):
    case FAILURE(ACTION_TYPES.CREATE_MANTAGHE):
    case FAILURE(ACTION_TYPES.UPDATE_MANTAGHE):
    case FAILURE(ACTION_TYPES.DELETE_MANTAGHE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANTAGHE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANTAGHE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MANTAGHE):
    case SUCCESS(ACTION_TYPES.UPDATE_MANTAGHE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MANTAGHE):
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

const apiUrl = 'api/mantaghes';

// Actions

export const getEntities: ICrudGetAllAction<IMantaghe> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MANTAGHE_LIST,
  payload: axios.get<IMantaghe>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMantaghe> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MANTAGHE,
    payload: axios.get<IMantaghe>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMantaghe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MANTAGHE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMantaghe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MANTAGHE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMantaghe> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MANTAGHE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
