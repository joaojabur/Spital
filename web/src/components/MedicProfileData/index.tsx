import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";

interface MedicProfileDataProps {
  id: string;
  medic: {
    userID: string;
    area: string;
    birth_date: string;
    cpf: string;
    doctorate_degree: string;
    graduation: string;
    rg: string;
    phoneNumber: string;
    master_degree: string;
  } | null;
}

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

const MedicProfileData: React.FC<MedicProfileDataProps> = ({ id, medic }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    api.get(`users?id=${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <div className="medic-profile-data">
      <h2>
        Sobre Dr. {user?.firstName} {user?.lastName}
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
