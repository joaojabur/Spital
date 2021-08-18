import { useState, useEffect } from "react";
import Categories from "../../components/Categories";
import DoctorList, { Medic } from "../../components/DoctorList";
import HeaderPlatform from "../../components/HeaderPlatform";
import LoadMoreButton from "../../components/LoadMoreButton";
import api from "../../services/api";
import Geocode from "react-geocode";
import "./styles.css";
import { useInfoData } from "../../context/InfoProvider";

const HomeClient = () => {
  const { setInfoData, infoData } = useInfoData();
  const [isLocationActivated, setIsLocationActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [medics, setMedics] = useState<Array<Medic>>([]);
  let [location, setLocation] = useState<null | GeolocationPosition>(null);

  async function loadMore() {
    setLoading(true);
    let { data } = await api.get(
      `medics?offset=${page}&lat=${location?.coords.latitude}&lon=${location?.coords.longitude}`
    );
    data = data.map((medic: Medic) => medic);

    Geocode.fromLatLng(
      `${location?.coords.latitude}`,
      `${location?.coords.longitude}`
    ).then((response: any) => {
      try {
        const address = response.results;
        setInfoData({ ...infoData, location: address[0].formatted_address });
      } catch (error) {
        console.log(error);
      }
    });

    setMedics((previousState) => [...previousState, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  async function getUserLocation() {
    if (navigator.geolocation) {
      let permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "granted" || permission.state === "prompt") {
        setIsLocationActivated(true);
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLocation(pos);
          },
          () => {},
          { enableHighAccuracy: true }
        );
      } else if (permission.state === "denied") {
        console.log("Você precisa ativar sua localização");
        setIsLocationActivated(false);
      }

      permission.onchange = () => {
        console.log("Estado alterado");
      };
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!location) {
      // Nothing
    } else {
      loadMore();
    }
  }, [location]);

  Geocode.setApiKey("AIzaSyDanmMSOYTtyp-Lbu43BVKiSW5EP8FRS9Y");
  Geocode.setLanguage("pt");
  Geocode.setRegion("br");
  Geocode.enableDebug();

  return (
    <>
      {isLocationActivated ? (
        <div className="client-platform">
          <HeaderPlatform />
          <div className="container">
            <Categories />
            <DoctorList loading={loading} medics={medics} />
            <LoadMoreButton onClick={loadMore} />
          </div>
        </div>
      ) : (
        <div className="location-message">
          <h1>Você precisa ativar sua localização para continuarmos</h1>
          <p>
            Caso tenha dificuldades, isso pode de ajudar:{" "}
            <a
              href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=pt"
              rel="noreferrer"
              target="_blank"
            >
              https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=pt
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default HomeClient;
