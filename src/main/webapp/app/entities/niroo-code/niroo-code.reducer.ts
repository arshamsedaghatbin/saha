import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INirooCode, defaultValue } from 'app/shared/model/niroo-code.model';

export const ACTION_TYPES = {
  FETCH_NIROOCODE_LIST: 'nirooCode/FETCH_NIROOCODE_LIST',
  FETCH_NIROOCODE: 'nirooCode/FETCH_NIROOCODE',
  CREATE_NIROOCODE: 'nirooCode/CREATE_NIROOCODE',
  UPDATE_NIROOCODE: 'nirooCode/UPDATE_NIROOCODE',
  DELETE_NIROOCODE: 'nirooCode/DELETE_NIROOCODE',
  RESET: 'nirooCode/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INirooCode>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type NirooCodeState = Readonly<typeof initialState>;

// Reducer

export default (state: NirooCodeState = initialState, action): NirooCodeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NIROOCODE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NIROOCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NIROOCODE):
    case REQUEST(ACTION_TYPES.UPDATE_NIROOCODE):
    case REQUEST(ACTION_TYPES.DELETE_NIROOCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NIROOCODE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NIROOCODE):
    case FAILURE(ACTION_TYPES.CREATE_NIROOCODE):
    case FAILURE(ACTION_TYPES.UPDATE_NIROOCODE):
    case FAILURE(ACTION_TYPES.DELETE_NIROOCODE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NIROOCODE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NIROOCODE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NIROOCODE):
    case SUCCESS(ACTION_TYPES.UPDATE_NIROOCODE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NIROOCODE):
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

const apiUrl = 'api/niroo-codes';

// Actions

export const getEntities: ICrudGetAllAction<INirooCode> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NIROOCODE_LIST,
  payload: axios.get<INirooCode>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<INirooCode> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NIROOCODE,
    payload: axios.get<INirooCode>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<INirooCode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NIROOCODE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INirooCode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NIROOCODE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INirooCode> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NIROOCODE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
