import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  var [isClosed, setIsClosed] = useState(false);
  var toggleChange = function () {
    setIsClosed(!isClosed);
  };
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
            <Link to="/">
              <li className="nav-items active">PROFILE</li>
            </Link>
            <Link to="/attendance">
              <li className="nav-items">ATTENDANCE</li>
            </Link>
            <Link to="/logout">
              <li className="nav-items">LOGOUT</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}
