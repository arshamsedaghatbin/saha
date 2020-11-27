import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IYeganCode, defaultValue } from 'app/shared/model/yegan-code.model';

export const ACTION_TYPES = {
  FETCH_YEGANCODE_LIST: 'yeganCode/FETCH_YEGANCODE_LIST',
  FETCH_YEGANCODE: 'yeganCode/FETCH_YEGANCODE',
  CREATE_YEGANCODE: 'yeganCode/CREATE_YEGANCODE',
  UPDATE_YEGANCODE: 'yeganCode/UPDATE_YEGANCODE',
  DELETE_YEGANCODE: 'yeganCode/DELETE_YEGANCODE',
  RESET: 'yeganCode/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IYeganCode>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type YeganCodeState = Readonly<typeof initialState>;

// Reducer

export default (state: YeganCodeState = initialState, action): YeganCodeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_YEGANCODE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_YEGANCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_YEGANCODE):
    case REQUEST(ACTION_TYPES.UPDATE_YEGANCODE):
    case REQUEST(ACTION_TYPES.DELETE_YEGANCODE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_YEGANCODE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_YEGANCODE):
    case FAILURE(ACTION_TYPES.CREATE_YEGANCODE):
    case FAILURE(ACTION_TYPES.UPDATE_YEGANCODE):
    case FAILURE(ACTION_TYPES.DELETE_YEGANCODE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGANCODE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGANCODE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_YEGANCODE):
    case SUCCESS(ACTION_TYPES.UPDATE_YEGANCODE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_YEGANCODE):
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

const apiUrl = 'api/yegan-codes';

// Actions

export const getEntities: ICrudGetAllAction<IYeganCode> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_YEGANCODE_LIST,
  payload: axios.get<IYeganCode>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IYeganCode> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_YEGANCODE,
    payload: axios.get<IYeganCode>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IYeganCode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_YEGANCODE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IYeganCode> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_YEGANCODE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IYeganCode> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_YEGANCODE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
