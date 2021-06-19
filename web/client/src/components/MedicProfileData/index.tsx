import React from "react";
import { MedicProps } from "../MedicProfilePages/Main";
import "./styles.css";

interface MedicProfileDataProps {
  medic: MedicProps | null;
}

const MedicProfileData: React.FC<MedicProfileDataProps> = ({ medic }) => {
  return (
    <div className="medic-profile-data">
      <h2>
        Sobre Dr. {medic?.firstName} {medic?.lastName}
      </h2>

      <ul className="medic-profile-data-list">
        <li>
          Graduação: <span>{medic?.graduation}</span>
        </li>
        <li>
          Doutorado: <span>{medic?.doctorate_degree}</span>
        </li>
        <li>
          Mestrado: <span>{medic?.master_degree}</span>
        </li>
      </ul>
    </div>
  );
};

export default MedicProfileData;
