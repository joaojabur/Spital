import "./styles.css";
import { useParams } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import api from "../../services/api";
import { useEffect, useState } from "react";
import DoctorList, { Medic } from "../../components/DoctorList";
import LoadMoreButton from "../../components/LoadMoreButton";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import { IoFilterOutline } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";

interface ParamTypes {
  area: string;
}

const MedicArea = () => {
  const { filter } = useModal();

  const {} = useModal();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [medics, setMedics] = useState<Array<Medic>>([]);

  async function loadMore() {
    setLoading(true);
    let { data } = await api.get(`medics/${capitalizeArea}?offset=${page}`);
    data = data.map((medic: Medic) => medic);

    setMedics((previousState) => [...previousState, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  const { area } = useParams<ParamTypes>();

  let capitalizeArea = area.charAt(0).toUpperCase() + area.slice(1);
  if (capitalizeArea === "Alergistas-e-imunologista") {
    capitalizeArea = "Alergista-e-Imunologista";
  }

  useEffect(() => {
    api.get(`medics/${capitalizeArea}`).then((response) => {
      setMedics(response.data);
    });
  }, [capitalizeArea]);

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title={`Busque os melhores ${area}s da sua região!`}
        returnFunction={() => history.goBack()}
      />
      <div className="container">
        <div className="search-flex">
          <div className="search-flex-input">
            <SearchInput placeholder="Busque pelo nome do médico..." />
          </div>
          <div onClick={filter.open} className="search-flex-filter-button">
            <IoFilterOutline size={22} color="#000000" />
          </div>
        </div>

        <DoctorList medics={medics} loading={loading} />
        <LoadMoreButton onClick={loadMore} />
      </div>
    </div>
  );
};

export default MedicArea;
