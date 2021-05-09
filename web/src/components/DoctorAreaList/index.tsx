import React, { useState, useEffect } from "react";
import api from "../../services/api";
import DoctorItem from "../DoctorItem";

interface DoctorAreaListProps {
  area: string;
}

const DoctorAreaList: React.FC<DoctorAreaListProps> = ({ area }) => {
  const [medics, setMedics] = useState([]);

  return (
    <div className="doctor-list">
      <div className="doctors-list-text">
        <h1>Médicos:</h1>
      </div>
      <div className="doctors-list-content">
        {medics.length === 0 ? (
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Médicos não encontrados
          </h1>
        ) : (
          medics.map((medic, index) => {
            return (
              <div key={index} className="doctors-list-unique">
                <DoctorItem medic={medic} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DoctorAreaList;
