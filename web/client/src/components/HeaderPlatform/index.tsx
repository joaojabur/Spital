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

import { IoLogOutOutline } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";
import { useInfoData } from "../../context/InfoProvider";

interface HeaderPlatformProps {
  title?: string;
}

const HeaderPlatform: React.FC<HeaderPlatformProps> = ({ title }) => {
  const { infoData } = useInfoData();
  const { spinner, location } = useModal();
  const { user, logout } = useAuth();
  const [showMobileNav, setShowMobileNav] = useState(false);

  function handleShowMobileNav() {
    setShowMobileNav(!showMobileNav);
  }

  function logoutSpinner() {
    spinner.open();
    logout();
    spinner.close();
  }

  const links = [
    {
      label: "Procurar",
      goTo: "/busca",
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
          <div
            onClick={() => {
              location.open({
                close: () => {
                  location.close();
                },
                address: infoData?.location,
              });
            }}
            className="header-platform-location-flex"
          >
            <p className="address">{infoData?.location.substring(0, 30)}...</p>
            <IoCaretDownOutline
              style={{ position: "relative", top: "-3px" }}
              size={20}
              color="#bcfafc"
            />
          </div>
        </div>

        <div onClick={logoutSpinner} className="logout-button">
          <p>Sair</p>{" "}
          <IoLogOutOutline
            style={{
              position: "relative",
              top: "-0.45rem",
              marginLeft: "1rem",
            }}
            color="#fff"
            size={30}
          />
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
