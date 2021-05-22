import { useState, useEffect } from "react";
import Categories from "../../components/Categories";
import DoctorList, { Medic } from "../../components/DoctorList";
import HeaderPlatform from "../../components/HeaderPlatform";
import LoadMoreButton from "../../components/LoadMoreButton";
import api from "../../services/api";
import "./styles.css";

const HomeClient = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [medics, setMedics] = useState<Array<Medic>>([]);
  const [location, setLocation] = useState<null | GeolocationPosition>(null);

  async function loadMore() {
    setLoading(true);
    let { data } = await api.get(`medics?offset=${page}&lat=${location?.coords.latitude}&lon=${location?.coords.longitude}`);
    data = data.map((medic: Medic) => medic);

    setMedics((previousState) => [...previousState, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  
  async function getUserLocation() {
    if (navigator.geolocation){
      let permission = await navigator.permissions.query({ name: "geolocation"});

      if (permission.state === 'granted' || permission.state === 'prompt'){
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
          console.log(pos);
          setLocation(pos);
          
        }, () => {}, { enableHighAccuracy: true});
      } else if (permission.state === 'denied') {
        //
        console.log("Você precisa ativar sua localização")
      }

      permission.onchange = () => {
        console.log("Estado alterado")
        console.log(permission.state);
      };
    }
  }

  console.log(medics);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    loadMore();
  }, [location])

  return (
    <div className="client-platform">
      <HeaderPlatform />
      <div className="container">
        <Categories />
        <DoctorList loading={loading} medics={medics}/>
        <LoadMoreButton onClick={loadMore} />
      </div>
    </div>
  );
};

export default HomeClient;
