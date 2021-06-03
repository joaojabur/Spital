import React from "react";
import "./styles.css";

import logo from "../../assets/images/logo.svg";
import returnIcon from "../../assets/icons/return.svg";

interface HeaderProps {
  title: string;
  subTitle?: string;
  returnFunction: () => void;
}

const MainHeader: React.FC<HeaderProps> = ({ title, subTitle, returnFunction }) => {
  return (
    <div className="main-header">
      <div className="container main-header-context">
        <img 
          src={returnIcon} 
          alt="Retornar" 
          className="return" 
          onClick={(e) => returnFunction()}/>
        <div className="main-header-title">
          <h1>{title}</h1>
          <h3>{subTitle}</h3>
        </div>
        <img className="logo" src={logo} alt="Spital" />
      </div>
    </div>
  );
};

export default MainHeader;
