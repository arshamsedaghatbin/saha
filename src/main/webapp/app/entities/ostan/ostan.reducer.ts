import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOstan, defaultValue } from 'app/shared/model/ostan.model';

export const ACTION_TYPES = {
  FETCH_OSTAN_LIST: 'ostan/FETCH_OSTAN_LIST',
  FETCH_OSTAN: 'ostan/FETCH_OSTAN',
  CREATE_OSTAN: 'ostan/CREATE_OSTAN',
  UPDATE_OSTAN: 'ostan/UPDATE_OSTAN',
  DELETE_OSTAN: 'ostan/DELETE_OSTAN',
  RESET: 'ostan/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOstan>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OstanState = Readonly<typeof initialState>;

// Reducer

export default (state: OstanState = initialState, action): OstanState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OSTAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OSTAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OSTAN):
    case REQUEST(ACTION_TYPES.UPDATE_OSTAN):
    case REQUEST(ACTION_TYPES.DELETE_OSTAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_OSTAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OSTAN):
    case FAILURE(ACTION_TYPES.CREATE_OSTAN):
    case FAILURE(ACTION_TYPES.UPDATE_OSTAN):
    case FAILURE(ACTION_TYPES.DELETE_OSTAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OSTAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OSTAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OSTAN):
    case SUCCESS(ACTION_TYPES.UPDATE_OSTAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OSTAN):
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

const apiUrl = 'api/ostans';

// Actions

export const getEntities: ICrudGetAllAction<IOstan> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OSTAN_LIST,
  payload: axios.get<IOstan>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOstan> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OSTAN,
    payload: axios.get<IOstan>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOstan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OSTAN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOstan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OSTAN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOstan> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OSTAN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
