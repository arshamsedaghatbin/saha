import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IYeganType, defaultValue } from 'app/shared/model/yegan-type.model';

export const ACTION_TYPES = {
  FETCH_YEGANTYPE_LIST: 'yeganType/FETCH_YEGANTYPE_LIST',
  FETCH_YEGANTYPE: 'yeganType/FETCH_YEGANTYPE',
  CREATE_YEGANTYPE: 'yeganType/CREATE_YEGANTYPE',
  UPDATE_YEGANTYPE: 'yeganType/UPDATE_YEGANTYPE',
  DELETE_YEGANTYPE: 'yeganType/DELETE_YEGANTYPE',
  RESET: 'yeganType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IYeganType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type YeganTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: YeganTypeState = initialState, action): YeganTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_YEGANTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_YEGANTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_YEGANTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_YEGANTYPE):
    case REQUEST(ACTION_TYPES.DELETE_YEGANTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_YEGANTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_YEGANTYPE):
    case FAILURE(ACTION_TYPES.CREATE_YEGANTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_YEGANTYPE):
    case FAILURE(ACTION_TYPES.DELETE_YEGANTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGANTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGANTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_YEGANTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_YEGANTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_YEGANTYPE):
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

const apiUrl = 'api/yegan-types';

// Actions

export const getEntities: ICrudGetAllAction<IYeganType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_YEGANTYPE_LIST,
  payload: axios.get<IYeganType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IYeganType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_YEGANTYPE,
    payload: axios.get<IYeganType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IYeganType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_YEGANTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IYeganType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_YEGANTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IYeganType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_YEGANTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
