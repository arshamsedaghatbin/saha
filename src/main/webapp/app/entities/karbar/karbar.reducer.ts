import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKarbar, defaultValue } from 'app/shared/model/karbar.model';

export const ACTION_TYPES = {
  FETCH_KARBAR_LIST: 'karbar/FETCH_KARBAR_LIST',
  FETCH_KARBAR: 'karbar/FETCH_KARBAR',
  CREATE_KARBAR: 'karbar/CREATE_KARBAR',
  UPDATE_KARBAR: 'karbar/UPDATE_KARBAR',
  DELETE_KARBAR: 'karbar/DELETE_KARBAR',
  RESET: 'karbar/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKarbar>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type KarbarState = Readonly<typeof initialState>;

// Reducer

export default (state: KarbarState = initialState, action): KarbarState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KARBAR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KARBAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_KARBAR):
    case REQUEST(ACTION_TYPES.UPDATE_KARBAR):
    case REQUEST(ACTION_TYPES.DELETE_KARBAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_KARBAR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KARBAR):
    case FAILURE(ACTION_TYPES.CREATE_KARBAR):
    case FAILURE(ACTION_TYPES.UPDATE_KARBAR):
    case FAILURE(ACTION_TYPES.DELETE_KARBAR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KARBAR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KARBAR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_KARBAR):
    case SUCCESS(ACTION_TYPES.UPDATE_KARBAR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_KARBAR):
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

const apiUrl = 'api/karbars';

// Actions

export const getEntities: ICrudGetAllAction<IKarbar> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_KARBAR_LIST,
  payload: axios.get<IKarbar>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IKarbar> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KARBAR,
    payload: axios.get<IKarbar>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IKarbar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KARBAR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKarbar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KARBAR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKarbar> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KARBAR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
