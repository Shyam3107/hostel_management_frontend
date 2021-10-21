export const error = "error";
export const success = "success";
export const warn = "warn";

export const ROUTES = {
  LOGIN: "/login",
  ATTENDANCE: "/attendance",
  PROFILE: "/profile",
  LOGOUT: "/logout",
};

export const formatDate = (date) => {
  try {
    date = new Date(date).toLocaleString();
    return date;
  } catch (error) {
    return "InValid Date";
  }
};
