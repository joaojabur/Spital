import React from "react";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const MedicProfileInfo = () => {
  const { user } = useAuth();
  return (
    <div className="medic-profile-data">
      <h2>
        Sobre Dr(a). {user.firstName} {user.lastName}
      </h2>

      <ul className="medic-profile-data-list">
        <li>
          Graduação: <span>{user.graduation}</span>
        </li>
        <li>
          Doutorado: <span>{user.doctorageDegree}</span>
        </li>
        <li>
          Mestrado: <span>{user.masterDegree}</span>
        </li>
      </ul>
    </div>
  );
};

export default MedicProfileInfo;
