import { combineReducers } from "redux";
import attendanceReducer from "./Attendance/reducer";
import loginReducer from "./Login/reducer";
import studentReducer from "./Students/reducer";
import leaveReducer from "./Leave/reducer";

export default combineReducers({
  attendance: attendanceReducer,
  user: loginReducer,
  students: studentReducer,
  leave: leaveReducer,
});
