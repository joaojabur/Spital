import React, { useState, useEffect } from "react";
import api from "../../services/api";
import DoctorItem from "../DoctorItem";

interface DoctorAreaListProps {
  area: string;
}

const DoctorAreaList: React.FC<DoctorAreaListProps> = ({ area }) => {
  const [medics, setMedics] = useState([]);

  const capitalizeArea = area.charAt(0).toUpperCase() + area.slice(1);

  useEffect(() => {
    api.get(`medics/${capitalizeArea}`).then((response) => {
      setMedics(response.data);
    });
  }, [capitalizeArea]);

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

export default DoctorAreaList;
