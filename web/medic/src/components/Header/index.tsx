import React from "react";
import "./styles.css";
import logo from "../../assets/images/logo.svg";
import { MdAssignment } from "react-icons/md";
import { GoSignIn } from "react-icons/go";
import { Link } from "react-router-dom";

const links = [
  {
    label: "Crie sua conta gratuita!",
    goTo: "/registrar",
    icon: <MdAssignment style={{ marginLeft: "1rem" }} color="#fff" size={30} />,
  },
  {
    label: "Entrar",
    goTo: "/entrar",
    icon: <GoSignIn style={{ marginLeft: "1rem" }} color="#fff" size={30} />,
  },
];

const Header = () => {
  return (
    <div className="header">
      <ul>
        {links.map((link, index) => {
          return (
            <Link style={{ display: "flex" }} to={link.goTo} key={index}>
              {link.label}
              {link.icon}
            </Link>
          );
        })}
      </ul>
      <img src={logo} alt="Spital" />
    </div>
  );
};

export default Header;
