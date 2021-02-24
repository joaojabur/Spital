import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import returnIcon from "../../assets/images/icons/return.svg";

interface HeaderProps {
  title: string;
  subTitle?: string;
  returnTo: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, returnTo }) => {
  return (
    <div className="header">
      <div className="container header-context">
        <Link className="return-link" to={`/${returnTo}`}>
          <img src={returnIcon} alt="Retornar" className="return" />
        </Link>
        <div className="header-title">
          <h1>{title}</h1>
          <h3>{subTitle}</h3>
        </div>
        <img className="logo" src={logo} alt="Spital" />
      </div>
    </div>
  );
};

export default Header;
