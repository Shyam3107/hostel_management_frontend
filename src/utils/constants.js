import moment from 'moment'

export const error = "error";
export const success = "success";
export const warn = "warn";


export const ROUTES = {
  LOGIN: "/login",
  ATTENDANCE: "/attendance",
  PROFILE: "/profile",
  LOGOUT: "/logout",
  STUDENTS: "/students",
  LEAVE: "/leave",
};

export const formatDate = (date) => {
  try {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  } catch (error) {
    return "InValid Date";
  }
};
