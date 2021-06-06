import React from "react";
import "./styles.css";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import banking from "../../../assets/images/banking.svg";

const BankData = ({ previousPage, nextPage }: PagesProps) => {
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
        <button style={{ width: "100%" }} className="next">
          Ir para a Stripe
        </button>
      </div>
    </div>
  );
};

export default BankData;
