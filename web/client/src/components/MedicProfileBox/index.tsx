import React from "react";
import "./styles.css";
import Stars from "../Stars";
import { MedicProps } from "../MedicProfilePages/Main";

interface MedicProfileBoxProps {
  medic: MedicProps | null;
  area: string | undefined;
  rating: number;
  nextPage: () => void;
}

const MedicProfileBox: React.FC<MedicProfileBoxProps> = ({
  medic,
  area,
  nextPage,
  rating,
}) => {
  return (
    <div className="medic-profile-box">
      <div className="medic-profile-box-name">
        <img src={medic?.url} className="medic-profile-box-image" alt={medic?.firstName + " " + medic?.lastName}/>
        <h2>Dr. {medic?.firstName}</h2>
        <p>{area}</p>
        <div className="medic-profile-box-rating">
          <Stars rating={rating} />
        </div>
      </div>
      <button onClick={nextPage} className="medic-profile-box-schedule">
        Agendar consulta
      </button>
    </div>
  );
};

export default MedicProfileBox;
