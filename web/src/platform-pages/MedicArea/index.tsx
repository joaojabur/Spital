import HeaderPlatform from "../../components/HeaderPlatform";
import "./styles.css";
import { useParams } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import DoctorAreaList from "../../components/DoctorAreaList";

interface ParamTypes {
  area: string;
}

const MedicArea = () => {
  const { area } = useParams<ParamTypes>();

  return (
    <div className="client-platform">
      <HeaderPlatform title="Encontre os melhores médicos da sua região" />
      <div className="container">
        <SearchInput placeholder="Busque pelo nome do médico..." />
        <DoctorAreaList area={area} />
      </div>
    </div>
  );
};

export default MedicArea;
