import React, { useState, useEffect } from "react";
import api from "../../services/api";
import DoctorItem from "../DoctorItem";
import "./styles.css";

const DoctorList = () => {
  const [medics, setMedics] = useState([]);

  useEffect(() => {
    api.get("medics").then((response) => {
      setMedics(response.data);
    });
  }, []);

  return (
    <div className="doctor-list">
      <div className="doctors-list-text">
        <h1>Médicos</h1>
      </div>
      <div className="doctors-list-content">
        {medics.map((medic, index) => {
          return (
            <div key={index} className="doctors-list-unique">
              <DoctorItem medic={medic} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorList;
