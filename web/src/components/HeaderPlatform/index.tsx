import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoCaretDownOutline,
  IoReorderFourOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import logo from "../../assets/images/logo.svg";
import { useAuth } from "../../context/AuthProvider";

interface HeaderPlatformProps {
  title?: string;
}

const HeaderPlatform: React.FC<HeaderPlatformProps> = ({ title }) => {
  const { user } = useAuth();
  const [showMobileNav, setShowMobileNav] = useState(false);

  function handleShowMobileNav() {
    setShowMobileNav(!showMobileNav);
  }

  const links = [
    {
      label: "Procurar",
      goTo: "/busca",
    },
    {
      label: "Chats",
      goTo: "/conversas",
    },
    {
      label: "Consultas",
      goTo: "/consultas",
    },
    {
      label: "Perfil",
      goTo: "/perfil",
    },
    {
      label: "Principal",
      goTo: "/principal",
    },
  ];

  return (
    <div className="header-platform">
      <div className="header-platform-flex">
        <button
          style={{ border: "none", outline: "none" }}
          onClick={handleShowMobileNav}
          className="header-button-nav"
          type="button"
        >
          {showMobileNav ? (
            <IoCloseCircleOutline size={30} color="#fff" />
          ) : (
            <IoReorderFourOutline size={30} color="#fff" />
          )}
        </button>
        <ul className="header-platform-nav">
          {links.map((link: any, index: number) => {
            return (
              <Link key={index} to={link.goTo}>
                {link.label}
              </Link>
            );
          })}
        </ul>

        <div className="header-platform-location">
          <IoLocationOutline
            style={{ position: "relative", top: "-3px" }}
            size={20}
            color="#fff"
          />
          <div className="header-platform-location-flex">
            <p className="address">Rua Vasconcelhos de Nogue...</p>
            <IoCaretDownOutline
              style={{ position: "relative", top: "-3px" }}
              size={20}
              color="#bcfafc"
            />
          </div>
        </div>

        <img className="header-logo" src={logo} alt="Spital" />
      </div>
      <ul
        className={
          showMobileNav
            ? "header-platform-nav-mobile-show"
            : "header-platform-nav-mobile"
        }
      >
        {links.map((link: any, index: number) => {
          return (
            <Link key={index} to={link.goTo}>
              {link.label}
            </Link>
          );
        })}
      </ul>

      {title ? (
        <h1 className="header-platform-title">{title}</h1>
      ) : (
        <h1 className="header-hello-message">
          Olá
          <span>{user.firstName}</span>
        </h1>
      )}
    </div>
  );
};

export default HeaderPlatform;
