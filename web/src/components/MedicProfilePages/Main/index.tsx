import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import MedicProfileBox from "../../../components/MedicProfileBox";
import MedicProfileInfo from "../../../components/MedicProfileInfo";
import MedicProfileData from "../../../components/MedicProfileData";
import api from "../../../services/api";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import { NamesProps } from "../../Form/Steps/Names";

export interface ParamTypes {
  id: string;
}

export interface MedicProps {
  id: string;
  userID: string;
  area: string;
  birth_date: string;
  cpf: string;
  doctorate_degree: string;
  graduation: string;
  rg: string;
  phoneNumber: string;
  master_degree: string;
}

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

const MainProfileMedic = ({nextPage, previousPage}: NamesProps) => {
  const history = useHistory();

  const date = new Date();
  const dateString = date.toString();
  const week_day = dateString.split(" ")[0];

  const [medic, setMedic] = useState<MedicProps | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    api.get(`medics?userID=${id}`).then((response) => {
      setMedic(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`users?id=${id}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  function getWeekday() {
    switch (week_day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return 0;
    }
  }

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title={`Perfil de Dr(a). ${user?.firstName}`}
        returnFunction={() => history.goBack()}
      />
      <div className="container">
        <div className="container-perfil">
          <MedicProfileBox nextPage={nextPage} id={id} area={medic?.area} />
          <MedicProfileInfo id={id} week_day={getWeekday()} />
        </div>
        <MedicProfileData id={id} medic={medic} />
      </div>
    </div>
  );
};

export default MainProfileMedic;
