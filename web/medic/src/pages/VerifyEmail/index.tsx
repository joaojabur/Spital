import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import verified from "../../assets/images/verified.svg";
import api from "../../services/api";

import "./styles.css";

interface VerifyEmailParams {
  token: string;
}

export default function VerifyEmail() {
  const history = useHistory();
  const { token } = useParams<VerifyEmailParams>();

  async function sendEmailVerification() {
    try {
      let response = await api.get(`/users/${token}`);

      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

      setTimeout(() => {
        history.replace("/entrar");
      }, 3000);
    } catch (err) {
      console.log("Ocorreu um erro");
    }
  }
  useEffect(() => {
    sendEmailVerification();
  }, []);
  return (
    <div className="confirm-email">
      <div className="confirm-email-content">
        <h1>E-mail verificado!</h1>
        <img src={verified} alt="E-mail" />
        <h2>
          Espere 3 segundos e será redirecionado para a página de login...
        </h2>
      </div>
    </div>
  );
}
