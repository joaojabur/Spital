import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import apple from "../../assets/icons/apple.svg";
import googlePlay from "../../assets/icons/google-play.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-app">
        <h2>Baixe o app Spital</h2>
        <Link to="/">
          <img src={apple} alt="Apple" />
          <div>
            <h3>DISPONÍVEL NO</h3>
            <p>Apple Store</p>
          </div>
        </Link>

        <Link style={{ marginTop: "1rem" }} to="/">
          <img src={googlePlay} alt="Google Play" />
          <div>
            <h3>DISPONÍVEL NO</h3>
            <p>Apple Store</p>
          </div>
        </Link>
      </div>
      <div className="footer-pacients">
        <h2>Pacientes</h2>
        <Link to="/">Entrar</Link>
        <Link to="/">Registrar</Link>
      </div>
      <div className="footer-terms">
        <h2>Termos de uso</h2>
        <button>Clique aqui</button>
      </div>
    </div>
  );
};

export default Footer;
