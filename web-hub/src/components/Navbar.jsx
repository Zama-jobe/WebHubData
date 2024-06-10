import React from "react";
import "../style.css";
import Logo from "../img/webhub3.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <Link className="link" to="/?web=art">
            <h6>HOME</h6>
          </Link>
          {/* <Link className="link" to="/?web=art">
            <h6></h6>
          </Link>
          <Link className="link" to="/?web=art">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?web=art">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?web=art">
            <h6>FOOD</h6>
          </Link> */}
          <span>Zama</span>
          <span>Logout</span>
          <span className="write">
            <Link className="link" to={"/write"}>
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
