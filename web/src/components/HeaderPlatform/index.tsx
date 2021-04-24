import { useContext } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { IoLocationOutline, IoCaretDownOutline } from "react-icons/io5";
import logo from "../../assets/images/logo.svg";
import DataContext from "../../context/DataContext";

const HeaderPlatform = () => {
  const { loggedUser } = useContext(DataContext);
  console.log(loggedUser);

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
        <ul className="header-platform-nav">
          {links.map((link: any) => {
            return <Link to={link.goTo}>{link.label}</Link>;
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
      <h1 className="header-hello-message">
        Olá
        <span>{loggedUser.firstName}</span>
      </h1>
    </div>
  );
};

export default HeaderPlatform;
