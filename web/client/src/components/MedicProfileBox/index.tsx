import React, { useEffect, useState } from "react";
import "./styles.css";
import { IoStar } from "react-icons/io5";
import api from "../../services/api";
import Stars from "../Stars";

interface MedicProfileBoxProps {
  id: string;
  area: string | undefined;
  rating: number;
  nextPage: () => void;
}

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

const MedicProfileBox: React.FC<MedicProfileBoxProps> = ({
  id,
  area,
  nextPage,
  rating
}) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    api.get(`users?id=${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <div className="medic-profile-box">
      <div className="medic-profile-box-name">
        <div className="medic-profile-box-image"></div>
        <h2>Dr. {user?.firstName}</h2>
        <p>{area}</p>
        <div className="medic-profile-box-rating">
          <Stars rating={rating}/>
        </div>
      </div>
      <button onClick={nextPage} className="medic-profile-box-schedule">
        Agendar consulta
      </button>
    </div>
  );
};

export default MedicProfileBox;
