import React from "react";
import Stars from "../../components/Stars";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const MedicProfileBox = () => {
  const { user } = useAuth();

  return (
    <div className="medic-profile-box">
      <div className="medic-profile-box-name">
        <div className="medic-profile-box-image"></div>
        <h2>Dr(a). {user.firstName}</h2>
        <p>{user.area}</p>
        <div className="medic-profile-box-rating">
          <Stars rating={Number(user.rating)} />
        </div>
      </div>
      <button className="medic-profile-box-schedule">Agendar consulta</button>
    </div>
  );
};

export default MedicProfileBox;
