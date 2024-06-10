import React from "react";
import "../style.css";
import Logo from "../img/webhub3.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img src={Logo} alt="" />
      <span>
        Made with love & <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
