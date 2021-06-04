import React, { useState } from "react";
import "./styles.css";

import medicine from "../../assets/icons/medicine.png";
import {
  IoCalendarOutline,
  IoPeopleOutline,
  IoMedicalOutline,
  IoPlayBackOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

interface VerticalHeaderProps {
  colorIcon: string;
}

const VerticalHeader = ({ colorIcon }: VerticalHeaderProps) => {
  const items = [
    {
      goTo: "/agenda",
      name: "agenda",
      icon: (
        <IoCalendarOutline
          style={{ cursor: "pointer", marginTop: "1.5rem" }}
          size="3.5rem"
          color={colorIcon === "agenda" ? "#62A4FB" : "#ccc"}
        />
      ),
    },
    {
      goTo: "/pacientes",
      name: "pacients",
      icon: (
        <IoPeopleOutline
          style={{ cursor: "pointer", marginTop: "1.5rem" }}
          size="3.5rem"
          color={colorIcon === "pacients" ? "#62A4FB" : "#ccc"}
        />
      ),
    },
    {
      goTo: "/perfil",
      name: "profile",
      icon: (
        <IoMedicalOutline
          style={{ cursor: "pointer", marginTop: "1.5rem" }}
          size="3.5rem"
          color={colorIcon === "profile" ? "#62A4FB" : "#ccc"}
        />
      ),
    },
    {
      goTo: "/consultas",
      name: "appointments",
      icon: (
        <IoPlayBackOutline
          style={{ cursor: "pointer", marginTop: "1.5rem" }}
          size="3.5rem"
          color={colorIcon === "appointments" ? "#62A4FB" : "#ccc"}
        />
      ),
    },
  ];

  return (
    <div className="vertical-header">
      <div className="vertical-header-menu">
        <img src={medicine} alt="Símbolo da medicina" />
        <div
          style={{ width: "70%", marginTop: "1rem" }}
          className="line-global"
        ></div>
        {items.map((item: any) => {
          return (
            <Link to={item.goTo}>
              <div>{item.icon}</div>
            </Link>
          );
        })}
      </div>
      <Link to="/configuracoes">
        <IoSettingsOutline
          style={{ cursor: "pointer", marginBottom: "1rem" }}
          size="3.5rem"
          color={colorIcon === "configurations" ? "#62A4FB" : "#ccc"}
        />
      </Link>
    </div>
  );
};

export default VerticalHeader;
