import { combineReducers } from "redux";
import attendanceReducer from "./Attendance/reducer";
import loginReducer from "./Login/reducer";

export default combineReducers({
  attendance: attendanceReducer,
  user: loginReducer,
});
