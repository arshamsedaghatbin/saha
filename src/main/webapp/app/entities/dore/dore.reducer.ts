import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDore, defaultValue } from 'app/shared/model/dore.model';

export const ACTION_TYPES = {
  FETCH_DORE_LIST: 'dore/FETCH_DORE_LIST',
  FETCH_DORE: 'dore/FETCH_DORE',
  CREATE_DORE: 'dore/CREATE_DORE',
  UPDATE_DORE: 'dore/UPDATE_DORE',
  DELETE_DORE: 'dore/DELETE_DORE',
  RESET: 'dore/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDore>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DoreState = Readonly<typeof initialState>;

// Reducer

export default (state: DoreState = initialState, action): DoreState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DORE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DORE):
    case REQUEST(ACTION_TYPES.UPDATE_DORE):
    case REQUEST(ACTION_TYPES.DELETE_DORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DORE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DORE):
    case FAILURE(ACTION_TYPES.CREATE_DORE):
    case FAILURE(ACTION_TYPES.UPDATE_DORE):
    case FAILURE(ACTION_TYPES.DELETE_DORE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DORE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DORE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DORE):
    case SUCCESS(ACTION_TYPES.UPDATE_DORE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DORE):
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

const apiUrl = 'api/dores';

// Actions

export const getEntities: ICrudGetAllAction<IDore> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DORE_LIST,
  payload: axios.get<IDore>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDore> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DORE,
    payload: axios.get<IDore>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DORE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DORE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDore> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DORE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
