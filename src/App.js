import { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { backendURL } from "./APIs/APIs";
import BackDropLoader from "./components/CustomComponents/BackDropLoader/BackDropLoader";

const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Route = lazy(() => import("./components/Routes/Route"));

axios.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
    }
    config.url = backendURL + config.url;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

function App(props) {
  const hist = createBrowserHistory();
  const loggedIn = props.user.loggedIn;

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      <Suspense fallback={<BackDropLoader />}>
        <Router history={hist}>
          
            {loggedIn && <Header />}
            <Route />
            <ToastContainer />
            {loggedIn && <Footer />}
          
        </Router>
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
