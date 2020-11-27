import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISemat, defaultValue } from 'app/shared/model/semat.model';

export const ACTION_TYPES = {
  FETCH_SEMAT_LIST: 'semat/FETCH_SEMAT_LIST',
  FETCH_SEMAT: 'semat/FETCH_SEMAT',
  CREATE_SEMAT: 'semat/CREATE_SEMAT',
  UPDATE_SEMAT: 'semat/UPDATE_SEMAT',
  DELETE_SEMAT: 'semat/DELETE_SEMAT',
  RESET: 'semat/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISemat>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SematState = Readonly<typeof initialState>;

// Reducer

export default (state: SematState = initialState, action): SematState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEMAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEMAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SEMAT):
    case REQUEST(ACTION_TYPES.UPDATE_SEMAT):
    case REQUEST(ACTION_TYPES.DELETE_SEMAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SEMAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEMAT):
    case FAILURE(ACTION_TYPES.CREATE_SEMAT):
    case FAILURE(ACTION_TYPES.UPDATE_SEMAT):
    case FAILURE(ACTION_TYPES.DELETE_SEMAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEMAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEMAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEMAT):
    case SUCCESS(ACTION_TYPES.UPDATE_SEMAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEMAT):
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

const apiUrl = 'api/semats';

// Actions

export const getEntities: ICrudGetAllAction<ISemat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SEMAT_LIST,
  payload: axios.get<ISemat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISemat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEMAT,
    payload: axios.get<ISemat>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISemat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEMAT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISemat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEMAT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISemat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEMAT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
