export const backendURL = "htttp://localhost:5000";

const modules = {
  attendance: "/attendance",
  login: "/login",
  leave: "/leave",
};

export const API = {
  //LOGIN
  LOGIN: `${modules.login}`,

  // ATTENDANCE
  GET_ATTENDANCE: `${modules.attendance}/getAttendance`,
  ADD_ATTENDANCE: `${modules.attendance}/addAttendance`,

  // LEAVE
  ADD_LEAVE: `${modules.leave}/addLeave`,
  EDIT_LEAVE: `${modules.leave}/editLeave`,
};
