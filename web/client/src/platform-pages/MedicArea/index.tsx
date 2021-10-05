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
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [medics, setMedics] = useState<Array<Medic>>([]);
  const [location, setLocation] = useState<null | GeolocationPosition>(null);
  const [medicName, setMedicName] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [maxDistance, setMaxDistance] = useState<number>(9999);

  function changePrice(price: number) {
    setMaxPrice(price);
  }

  function changeDistance(distance: number) {
    setMaxDistance(distance);
  }

  async function loadMore() {
    let name = medicName.replace(/[^0-9a-zA-Z:,]+/, "").toLowerCase();
    let { data } = await api.get(
      `medics/${capitalizeArea}?offset=${page}&lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&distance=${maxDistance}&name=${name}`
    );
    data = data.map((medic: Medic) => medic);

    setMedics((previousState) => [...previousState, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  async function reload() {
    let name = medicName.replace(/[^0-9a-zA-Z:,]+/, "").toLowerCase();
    let { data } = await api.get(
      `medics/${capitalizeArea}?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&distance=${maxDistance}&name=${name}`
    );
    data = data.map((medic: Medic) => medic);

    setMedics(data);
    setPage(1);
    setLoading(false);
  }

  async function getUserLocation() {
    if (navigator.geolocation) {
      let permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "granted" || permission.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLocation(pos);
          },
          () => {},
          { enableHighAccuracy: true }
        );
      } else if (permission.state === "denied") {
        //
        console.log("Você precisa ativar sua localização");
      }

      permission.onchange = () => {
        console.log("Estado alterado");
      };
    }
  }

  const { area } = useParams<ParamTypes>();

  let capitalizeArea = area.charAt(0).toUpperCase() + area.slice(1);
  if (capitalizeArea === "Alergistas-e-imunologista") {
    capitalizeArea = "Alergista e Imunologista";
  }

  useEffect(() => {
    setLoading(true);
    getUserLocation();
  }, [capitalizeArea]);

  useEffect(() => {
    if (location?.coords.latitude !== undefined) {
      reload();
    }
  }, [location, maxPrice, maxDistance]);

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title={`Busque os melhores ${area}s da sua região!`}
        returnFunction={() => history.goBack()}
      />
      <div className="container">
        <div className="search-flex">
          <div className="search-flex-input">
            <SearchInput
              placeholder="Busque pelo nome do médico..."
              onChange={(e) => setMedicName(e.currentTarget.value)}
              onKeyDown={(e) => (e.key === "Enter" ? reload() : null)}
              reload={reload}
            />
          </div>
          <div
            onClick={() =>
              filter.open({
                changePrice,
                changeDistance,
                currentDistance: maxDistance,
                currentPrice: maxPrice,
              })
            }
            className="search-flex-filter-button"
          >
            <IoFilterOutline size={22} color="#000000" />
          </div>
        </div>
        <DoctorList medics={medics} loading={loading} />
        {!loading && !medics.length && <h1>Nada encontrado</h1>}
        <LoadMoreButton onClick={loadMore} />
      </div>
    </div>
  );
};

export default MedicArea;
