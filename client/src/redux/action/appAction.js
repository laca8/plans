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
import axios from "axios";
export const addAppAction = (newApp) => async (dispatch, getState) => {
  dispatch({
    type: ADD_APP_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: userInfo.token,
      },
    };
    const { data } = await axios.post("/api/app", newApp, config);
    dispatch({
      type: ADD_APP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_APP_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const listAppsUserAction = () => async (dispatch, getState) => {
  dispatch({
    type: LIST_APPS_USER_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const { data } = await axios.get("/api/app/user", config);
    dispatch({
      type: LIST_APPS_USER_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: LIST_APPS_USER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const updateAppAction =
  (id, goalId, updateData) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_APP_REQUEST,
    });
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userInfo.token,
        },
      };
      const { data } = await axios.put(
        `/api/app/${id}/${goalId}`,
        updateData,
        config
      );
      dispatch({
        type: UPDATE_APP_SUCCESS,
        payload: data,
      });
      // console.log(data);
    } catch (error) {
      dispatch({
        type: UPDATE_APP_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
      });
    }
  };

export const listAppAction = () => async (dispatch, getState) => {
  dispatch({
    type: LIST_APPS_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/app`, config);
    dispatch({
      type: LIST_APPS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: LIST_APPS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const updateApp2Action =
  (id, goalId, updateData) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_APP_REQUEST,
    });
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userInfo.token,
        },
      };
      const { data } = await axios.put(
        `/api/app/update/${id}/${goalId}`,
        updateData,
        config
      );
      dispatch({
        type: UPDATE_APP_SUCCESS,
        payload: data,
      });
      // console.log(data);
    } catch (error) {
      dispatch({
        type: UPDATE_APP_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
      });
    }
  };

export const deleteAppAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_APP_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const { data } = await axios.delete(`/api/app/${id}`, config);
    dispatch({
      type: DELETE_APP_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_APP_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const addActivityAction = (newApp) => async (dispatch, getState) => {
  dispatch({
    type: ADD_GOAL_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: userInfo.token,
      },
    };
    const { data } = await axios.post("/api/app/activity", newApp, config);
    dispatch({
      type: ADD_GOAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_GOAL_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
