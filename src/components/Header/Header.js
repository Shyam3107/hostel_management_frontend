import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import styles from "./Header.module.css";

const Header = (props) => {
  let [isClosed, setIsClosed] = useState(false);
  let toggleChange = function () {
    setIsClosed(!isClosed);
  };

  const { userType } = props.user.user ? props.user.user : {};

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <h1 style={{ marginRight: "10px" }}>
          <Link to="/">
            <img
              className={styles.logo}
              src="/images/logo.png"
              alt="College Logo"
            />
          </Link>
        </h1>
        <h1 className={styles.collegeName}>
          <Link to="/">NITPY</Link>
        </h1>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleChange}
        >
          <span
            className={
              isClosed
                ? `${styles.menuOpen1} ${styles.menuOpen}`
                : styles.menuClose
            }
          ></span>
          <span
            className={
              isClosed
                ? `${styles.menuOpen2} ${styles.menuOpen}`
                : styles.menuClose
            }
          ></span>
          <span
            className={
              isClosed
                ? `${styles.menuOpen3} ${styles.menuOpen}`
                : styles.menuClose
            }
          ></span>
        </button>

        <div
          className="collapse navbar-collapse  justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className={"navbar-nav ml-auto " + styles.ul}>
            {userType === "STUDENT" && (
              <Link to={ROUTES.PROFILE}>
                <li className="nav-items active">PROFILE</li>
              </Link>
            )}
            {userType !== "STUDENT" && (
              <Link to={ROUTES.STUDENTS}>
                <li className="nav-items">STUDENTS</li>
              </Link>
            )}
            <Link to={ROUTES.ATTENDANCE}>
              <li className="nav-items">ATTENDANCE</li>
            </Link>
            <Link to={ROUTES.LEAVE}>
              <li className="nav-items">LEAVE</li>
            </Link>
            <Link to={ROUTES.LOGOUT}>
              <li className="nav-items">LOGOUT</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Header);
