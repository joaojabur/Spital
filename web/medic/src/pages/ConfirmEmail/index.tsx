import "./styles.css";

import email from "../../assets/images/email.svg";

const ConfirmEmail = () => {
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
};

export default ConfirmEmail;
