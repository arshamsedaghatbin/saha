import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IYegan, defaultValue } from 'app/shared/model/yegan.model';

export const ACTION_TYPES = {
  FETCH_YEGAN_LIST: 'yegan/FETCH_YEGAN_LIST',
  FETCH_YEGAN: 'yegan/FETCH_YEGAN',
  CREATE_YEGAN: 'yegan/CREATE_YEGAN',
  UPDATE_YEGAN: 'yegan/UPDATE_YEGAN',
  DELETE_YEGAN: 'yegan/DELETE_YEGAN',
  RESET: 'yegan/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IYegan>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type YeganState = Readonly<typeof initialState>;

// Reducer

export default (state: YeganState = initialState, action): YeganState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_YEGAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_YEGAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_YEGAN):
    case REQUEST(ACTION_TYPES.UPDATE_YEGAN):
    case REQUEST(ACTION_TYPES.DELETE_YEGAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_YEGAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_YEGAN):
    case FAILURE(ACTION_TYPES.CREATE_YEGAN):
    case FAILURE(ACTION_TYPES.UPDATE_YEGAN):
    case FAILURE(ACTION_TYPES.DELETE_YEGAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEGAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_YEGAN):
    case SUCCESS(ACTION_TYPES.UPDATE_YEGAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_YEGAN):
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

const apiUrl = 'api/yegans';

// Actions

export const getEntities: ICrudGetAllAction<IYegan> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_YEGAN_LIST,
  payload: axios.get<IYegan>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IYegan> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_YEGAN,
    payload: axios.get<IYegan>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IYegan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_YEGAN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IYegan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_YEGAN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IYegan> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_YEGAN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
