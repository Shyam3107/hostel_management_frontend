import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Attendance from "../Attendance/Attendance";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";

const Routes = (props) => {
  const loggedIn = props.user.loggedIn;

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>{loggedIn ? children : <Redirect to="/login" />}</Route>
    );
  };
  return (
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
        <Profile />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTES.ATTENDANCE}>
        <Attendance />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTES.LOGOUT}>
        <Logout />
      </PrivateRoute>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Routes);
