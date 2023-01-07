import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import {
  addAppReducer,
  listAppsByUserReducer,
  updateAppReducer,
  listAppsReducer,
  deleteAppReducer,
  addActivityReducer,
} from "./reducers/appReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addApp: addAppReducer,
  listAppsByUser: listAppsByUserReducer,
  updateApp: updateAppReducer,
  listApps: listAppsReducer,
  deleteApp: deleteAppReducer,
  addActivity: addActivityReducer,
});

const userInfoFormStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const middleware = [thunk];
const initialState = {
  userLogin: { userInfo: userInfoFormStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
