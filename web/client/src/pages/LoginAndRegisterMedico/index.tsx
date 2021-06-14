import "./styles.css";
import { Link, useHistory } from "react-router-dom";

import Header from "../../components/Header";

import loginIcon from "../../assets/images/icons/login.svg";
import registerIcon from "../../assets/images/icons/register.svg";

const LoginAndRegisterMedico = () => {
  const history = useHistory();
  return (
    <div className="login-and-register">
      <Header
        title="Que bom que você vai entrar pra nossa equipe!"
        subTitle="Primeiro, nós gostaríamos de saber já possui uma conta ou ainda não"
        returnFunction={() => history.push("/")}
      />
      <div className="login-and-register-buttons">
        <a href="http://localhost:3000/">
          <div className="button primary">
            <h1>Já possuo uma conta!</h1>
            <img src={loginIcon} alt="Entrar" />
          </div>
        </a>

        <a href="http://localhost:3000/">
          <div className="button secondary">
            <h1>Gostaria de me cadastar!</h1>
            <img src={registerIcon} alt="Registrar" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default LoginAndRegisterMedico;
