import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBargeMamooriat, defaultValue } from 'app/shared/model/barge-mamooriat.model';

export const ACTION_TYPES = {
  FETCH_BARGEMAMOORIAT_LIST: 'bargeMamooriat/FETCH_BARGEMAMOORIAT_LIST',
  FETCH_BARGEMAMOORIAT: 'bargeMamooriat/FETCH_BARGEMAMOORIAT',
  CREATE_BARGEMAMOORIAT: 'bargeMamooriat/CREATE_BARGEMAMOORIAT',
  UPDATE_BARGEMAMOORIAT: 'bargeMamooriat/UPDATE_BARGEMAMOORIAT',
  DELETE_BARGEMAMOORIAT: 'bargeMamooriat/DELETE_BARGEMAMOORIAT',
  RESET: 'bargeMamooriat/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBargeMamooriat>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BargeMamooriatState = Readonly<typeof initialState>;

// Reducer

export default (state: BargeMamooriatState = initialState, action): BargeMamooriatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BARGEMAMOORIAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BARGEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BARGEMAMOORIAT):
    case REQUEST(ACTION_TYPES.UPDATE_BARGEMAMOORIAT):
    case REQUEST(ACTION_TYPES.DELETE_BARGEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BARGEMAMOORIAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.CREATE_BARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.UPDATE_BARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.DELETE_BARGEMAMOORIAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BARGEMAMOORIAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BARGEMAMOORIAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BARGEMAMOORIAT):
    case SUCCESS(ACTION_TYPES.UPDATE_BARGEMAMOORIAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BARGEMAMOORIAT):
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

const apiUrl = 'api/barge-mamooriats';

// Actions

export const getEntities: ICrudGetAllAction<IBargeMamooriat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BARGEMAMOORIAT_LIST,
  payload: axios.get<IBargeMamooriat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBargeMamooriat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BARGEMAMOORIAT,
    payload: axios.get<IBargeMamooriat>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBargeMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BARGEMAMOORIAT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBargeMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BARGEMAMOORIAT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBargeMamooriat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BARGEMAMOORIAT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
