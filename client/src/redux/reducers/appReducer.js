import {
  ADD_APP_FAIL,
  ADD_APP_REQUEST,
  ADD_APP_SUCCESS,
  LIST_APPS_USER_FAIL,
  LIST_APPS_USER_REQUEST,
  LIST_APPS_USER_SUCCESS,
  UPDATE_APP_FAIL,
  UPDATE_APP_REQUEST,
  UPDATE_APP_SUCCESS,
  LIST_APPS_FAIL,
  LIST_APPS_REQUEST,
  LIST_APPS_SUCCESS,
  DELETE_APP_FAIL,
  DELETE_APP_REQUEST,
  DELETE_APP_SUCCESS,
  ADD_GOAL_FAIL,
  ADD_GOAL_REQUEST,
  ADD_GOAL_SUCCESS,
} from "../type";
const initialState = {};
export const addAppReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_APP_REQUEST:
      return {
        loading: true,
      };
    case ADD_APP_SUCCESS:
      return {
        loading: false,
        success: true,
        app: payload,
      };
    case ADD_APP_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const listAppsByUserReducer = (state = { apps: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_APPS_USER_REQUEST:
      return {
        loading: true,
      };
    case LIST_APPS_USER_SUCCESS:
      return {
        loading: false,
        apps: payload,
      };
    case LIST_APPS_USER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const updateAppReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_APP_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_APP_SUCCESS:
      return {
        loading: false,
        success: true,
        app: payload,
      };
    case UPDATE_APP_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const listAppsReducer = (state = { apps: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_APPS_REQUEST:
      return {
        loading: true,
      };
    case LIST_APPS_SUCCESS:
      return {
        loading: false,
        apps: payload,
      };
    case LIST_APPS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const deleteAppReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_APP_REQUEST:
      return {
        loading: true,
      };
    case DELETE_APP_SUCCESS:
      return {
        loading: false,
        app: payload,
      };
    case DELETE_APP_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export const addActivityReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_GOAL_REQUEST:
      return {
        loading: true,
      };
    case ADD_GOAL_SUCCESS:
      return {
        loading: false,
        success: true,
        activity: payload,
      };
    case ADD_GOAL_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
