import React from "react";
import "./styles.css";

import logo from "../../assets/images/logo.svg";
import returnIcon from "../../assets/images/icons/return.svg";

interface HeaderProps {
  title: string;
  subTitle?: string;
  returnFunction: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, returnFunction }) => {
  return (
    <div className="header">
      <div className="container header-context">
        <img 
          src={returnIcon} 
          alt="Retornar" 
          className="return" 
          onClick={(e) => returnFunction()}/>
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
