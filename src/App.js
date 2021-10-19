import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Route from "./components/Routes/Route";
import axios from "axios";
import { backendURL } from "./APIs/APIs";

axios.interceptors.request.use(
  (config) => {
    // const token = store.getState().session.token;
    // config.headers.Authorization =  `Bearer ${token}`;
    config.url = backendURL + config.url;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
