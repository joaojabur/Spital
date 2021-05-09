import { useState, useEffect } from "react";
import Categories from "../../components/Categories";
import DoctorList, { Medic } from "../../components/DoctorList";
import HeaderPlatform from "../../components/HeaderPlatform";
import LoadMoreButton from "../../components/LoadMoreButton";
import api from "../../services/api";
import "./styles.css";

const HomeClient = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [medics, setMedics] = useState<Array<Medic>>([]);

  async function loadMore() {
    setLoading(true);
    let { data } = await api.get(`medics?offset=${page}`);
    data = data.map((medic: Medic) => medic);

    setMedics((previousState) => [...previousState, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    api.get("medics").then((response: any) => {
      setMedics(response.data);
    });
  }, []);

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
