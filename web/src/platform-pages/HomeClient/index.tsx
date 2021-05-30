import { useState, useEffect } from "react";
import Categories from "../../components/Categories";
import DoctorList, { Medic } from "../../components/DoctorList";
import HeaderPlatform from "../../components/HeaderPlatform";
import LoadMoreButton from "../../components/LoadMoreButton";
import api from "../../services/api";
import Geocode from "react-geocode";
import "./styles.css";

const HomeClient = () => {
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
        console.log(address);
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
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLocation(pos);
          },
          () => {},
          { enableHighAccuracy: true }
        );
      } else if (permission.state === "denied") {
        console.log("Você precisa ativar sua localização");
      }

      permission.onchange = () => {
        console.log("Estado alterado");
        console.log(permission.state);
      };
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    console.log(location);
    if (!location) {
      // Nada
    } else {
      loadMore();
    }
  }, [location]);

  Geocode.setApiKey("AIzaSyAHU3nGBAYTXAVknTd_OZuyj2k9d9B0i98");
  Geocode.setLanguage("pt");
  Geocode.setRegion("br");
  Geocode.enableDebug();

  console.log(medics);

  return (
    <div className="client-platform">
      <HeaderPlatform />
      <div className="container">
        <Categories />
        <DoctorList loading={loading} medics={medics} />
        <LoadMoreButton onClick={loadMore} />
      </div>
    </div>
  );
};

export default HomeClient;
