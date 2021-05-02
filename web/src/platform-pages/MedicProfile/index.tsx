import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MedicProfileBox from "../../components/MedicProfileBox";

interface ParamTypes {
  id: string;
}

const MedicProfile = () => {
  const history = useHistory();

  const { id } = useParams<ParamTypes>();

  console.log(id);

  return (
    <div className="client-platform">
      <Header
        returnFunction={() => history.push("/")}
        title="Perfil de Dr. Jaison"
      />
      <div className="container">
        <div className="container-perfil">
          <MedicProfileBox />
        </div>
      </div>
    </div>
  );
};

export default MedicProfile;
