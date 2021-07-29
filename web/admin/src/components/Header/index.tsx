import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { IoMedicalOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";

const headerData = [
  {
    icon: (
      <RiDashboardLine
        size={30}
        color={window.location.pathname === "" ? "#fff" : "#333"}
      />
    ),
    label: "Dashboard",
    link: "/",
  },
  {
    icon: (
      <BsPersonLinesFill
        size={30}
        color={window.location.pathname === "/pacientes" ? "#fff" : "#333"}
      />
    ),
    label: "Pacientes",
    link: "/pacientes",
  },
  {
    icon: (
      <IoMedicalOutline
        size={30}
        color={window.location.pathname === "/profissionais" ? "#fff" : "#333"}
      />
    ),
    label: "Profissionais",
    link: "/profissionais",
  },
  {
    icon: (
      <BiCart
        size={30}
        color={window.location.pathname === "/pedidos" ? "#fff" : "#333"}
      />
    ),
    label: "Pedidos",
    link: "/pedidos",
  },
];

const Header = () => {
  return (
    <div className="header">
      <h1>Spital Admin</h1>
      <ul>
        {headerData.map((item, key) => {
          return (
            <Link
              key={key}
              id={window.location.pathname === item.link ? "active" : ""}
              to={item.link}
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
