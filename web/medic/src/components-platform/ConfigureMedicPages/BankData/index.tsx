import React, { useEffect, useState } from "react";
import "./styles.css";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import banking from "../../../assets/images/banking.svg";
import api from "../../../services/api";
import Loader from "react-loader-spinner";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { useAuth } from "../../../context/AuthProvider";

const BankData = ({ previousPage, nextPage }: PagesProps) => {
  const { userID } = useAuth();
  const { medicDataConfigure } = useShareFormMedicConfigure();
  const [loading, setLoading] = useState(false);
  const [accountLink, setAccountLink] = useState("");
  const [medicID, setMedicID] = useState("");

  useEffect(() => {
    api.get(`medics?id=${userID}`).then((response: any) => {
      setMedicID(response.data.id);
    });
  }, [userID]);

  console.log(medicID);

  function handleConfigureProfile() {
    setLoading(true);
    api
      .post(`configure-medic?medicID=${medicID}&userID=${userID}`, {
        appointments: medicDataConfigure.appointments,
        address: medicDataConfigure.address,
        number: medicDataConfigure.number,
        lat: medicDataConfigure.lat,
        lon: medicDataConfigure.lon,
      })
      .then((response: any) => {
        console.log(response);
        setLoading(false);
      });
  }

  function handleGenerateAccount() {
    setLoading(true);
    api.get("configure-medic").then((response) => {
      setAccountLink(response.data);
      setLoading(false);
    });
  }

  return (
    <div
      style={{ justifyContent: "space-between", padding: "2.5rem" }}
      className="landing"
    >
      <div style={{ width: "100%" }}>
        <div className="landing-flex">
          <h1 className="landing-flex-h1">Dados bancários</h1>
        </div>
        <div className="line-global"></div>
      </div>
      <h2 className="landing-text">
        O Spital possui parceria com a Stripe para processar pagamentos e sacar
        dinheiro.
      </h2>
      <img src={banking} alt="Banco" />
      <div className="landing-buttons">
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>

        {accountLink.length > 0 ? (
          <a
            href={accountLink}
            target="_blank"
            style={{
              width: "100%",
              background: "#07B3D6",
              textAlign: "center",
            }}
            className="next"
          >
            Ir para a Stripe
          </a>
        ) : (
          <button
            onClick={handleGenerateAccount}
            style={{ width: "100%" }}
            className="next"
          >
            {loading ? (
              <Loader type="TailSpin" color="#fff" height={30} width={30} />
            ) : (
              "Gerar conta"
            )}
          </button>
        )}
      </div>
      <button
        onClick={handleConfigureProfile}
        style={{ width: "100%", backgroundColor: "#3EB713" }}
        className="next"
      >
        {loading ? (
          <Loader type="TailSpin" color="#fff" height={30} width={30} />
        ) : (
          "Configurar perfil"
        )}
      </button>
    </div>
  );
};

export default BankData;
