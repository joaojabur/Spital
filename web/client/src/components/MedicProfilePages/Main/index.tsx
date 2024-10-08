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
  medicID: string;
}

export interface MedicProps {
  id: string | undefined;
  userID: string;
  area: string;
  birth_date: string;
  cpf: string;
  doctorate_degree: string;
  graduation: string;
  rg: string;
  phoneNumber: string;
  master_degree: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: string;
  location: {
    address: string;
    number: number;
  };
  url: string;
}

const MainProfileMedic = ({ nextPage }: NamesProps) => {
  const history = useHistory();

  const date = new Date();
  const dateString = date.toString();
  const week_day = dateString.split(" ")[0];

  const [medic, setMedic] = useState<MedicProps | null>(null);

  const { medicID } = useParams<ParamTypes>();

  useEffect(() => {
    api
      .get(`medics?id=${medicID}`)
      .then((response) => {
        setMedic(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          history.replace("/404");
        }
      });
  }, [medicID]);

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
        title={`Perfil de Dr(a). ${medic?.firstName}`}
        returnFunction={() => history.goBack()}
      />
      <div className="container">
        <div className="container-perfil">
          <MedicProfileBox
            nextPage={nextPage}
            medic={medic}
            rating={Number(medic?.rating ? medic.rating : 4)}
            area={medic?.area}
          />
          <MedicProfileInfo
            id={medicID}
            week_day={getWeekday()}
            medic={medic}
          />
        </div>
        <MedicProfileData medic={medic} />
      </div>
    </div>
  );
};

export default MainProfileMedic;
