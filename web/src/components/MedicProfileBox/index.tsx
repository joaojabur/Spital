import React from "react";
import "./styles.css";

const MedicProfileBox = () => {
  return (
    <div className="medic-profile-box">
      <div className="medic-profile-box-name">
        <div className="medic-profile-box-image"></div>
        <h2>Dr. Jason</h2>
        <p>Pneumologista</p>
      </div>

      <div className="medic-profile-box-schedule">Agendar consulta</div>
    </div>
  );
};

export default MedicProfileBox;
