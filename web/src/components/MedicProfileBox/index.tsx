import React, { useEffect, useState } from "react";
import "./styles.css";
import { IoStar } from "react-icons/io5";
import api from "../../services/api";

interface MedicProfileBoxProps {
  id: string;
  area: string | undefined;
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
}) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const rating = [1, 1, 1, 1, 1];

  useEffect(() => {
    api.get(`users?id=${id}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <div className="medic-profile-box">
      <div className="medic-profile-box-name">
        <div className="medic-profile-box-image"></div>
        <h2>Dr. {user?.firstName}</h2>
        <p>{area}</p>
        <div className="medic-profile-box-rating">
          {rating.map((star, index) => {
            return <IoStar key={index} color="#FFC107" size={30} />;
          })}
        </div>
      </div>
      <button onClick={nextPage} className="medic-profile-box-schedule">
        Agendar consulta
      </button>
    </div>
  );
};

export default MedicProfileBox;
