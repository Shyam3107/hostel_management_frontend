import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Attendance from "../Attendance/Attendance";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";
import Students from "../Students/Students";
import Leave from "../Leave/Leave";

const Routes = (props) => {
  const loggedIn = props.user.loggedIn;

  const { userType } = props.user.user ? props.user.user : {};

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>{loggedIn ? children : <Redirect to="/login" />}</Route>
    );
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect to={ROUTES.PROFILE} />
          ) : (
            <Redirect to={ROUTES.LOGIN} />
          )}
        </Route>
        <Route exact path={ROUTES.LOGIN}>
          {loggedIn ? <Redirect to={ROUTES.PROFILE} /> : <Login />}
        </Route>

        <PrivateRoute exact path={ROUTES.PROFILE}>
          {userType === "STUDENT" ? (
            <Profile />
          ) : (
            <Redirect to={ROUTES.STUDENTS} />
          )}
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.ATTENDANCE}>
          <Attendance />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.LOGOUT}>
          <Logout />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.STUDENTS}>
          {userType === "STUDENT" ? (
            <Redirect to={ROUTES.PROFILE} />
          ) : (
            <Students />
          )}
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.LEAVE}>
          <Leave />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Routes);
