import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import email from "../../assets/images/email.svg";
import api from "../../services/api";

import "./styles.css";

interface VerifyEmailParams {
  token: string;
}

export default function VerifyEmail() {
  const history = useHistory();
  const { token } = useParams<VerifyEmailParams>();

  async function sendEmailVerification(){
    try {
        let response = await api.get(`/users/${token}`);
        
        if (response.status !== 200){
            throw new Error(response.data.error);
        }

        setTimeout(() => {
            history.replace('/login');
        }, 3000)
    } catch(err) {
        console.log("Ocorreu um erro") // Token inválido    
    }
  }
  useEffect(() => {
      sendEmailVerification();
  }, []);
  return (
    <div className="confirm-email">
      <div className="confirm-email-content">
        <h1>Cadastro realizado com sucesso!</h1>
        <img src={email} alt="E-mail" />
        <h2>
          Precisamos agora que você confirme seu e-mail para realizar-mos o
          login.
        </h2>
        <p>Leia vosso e-mail e clique em confirmar e-mail</p>
      </div>
    </div>
  );
}
