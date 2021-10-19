import { Switch, Route } from "react-router-dom";
import Attendance from "../Attendance/Attendance";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Profile />
      </Route>
      <Route path="/attendance">
        <Attendance />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </Switch>
  );
}
