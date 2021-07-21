import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import Select from "../../components/Select";
import "./styles.css";

const Marketing = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="E-mail marketing" />
      <VerticalHeader colorIcon="marketing" />
      <div className="content">
        <div className="marketing">
          <h1 className="title-revenue">E-MAIL PARA PACIENTES</h1>
          <h2 className="subtitle-revenue">Dados do e-mail:</h2>
          <form className="email-form">
            <div className="select-div">
              <Select
                name="Número de pacientes (remetentes)"
                options={[
                  { label: "Até 500", value: "500" },
                  { label: "Até 1500", value: "1500" },
                  { label: "Até 3000", value: "3000" },
                  { label: "Até 5000", value: "5000" },
                ]}
              />
            </div>
            <div className="select-div">
              <Select
                name="Assunto do e-mail"
                options={[
                  { label: "Promoção", value: "Promoção" },
                  { label: "Comunicado", value: "Comunicado" },
                  { label: "Parceria", value: "Parcerias" },
                ]}
              />
            </div>
            <div className="select-div">
              <Select
                name="Estado"
                options={[
                  { value: "AC", label: "Acre" },
                  { value: "AL", label: "Alagoas" },
                  { value: "AP", label: "Amapá" },
                  { value: "AM", label: "Amazonas" },
                  { value: "BA", label: "Bahia" },
                  { value: "CE", label: "Ceará" },
                  { value: "DF", label: "Distrito Federal" },
                  { value: "ES", label: "Espirito Santo" },
                  { value: "GO", label: "Goiás" },
                  { value: "MA", label: "Maranhão" },
                  { value: "MS", label: "Mato Grosso do Sul" },
                  { value: "MT", label: "Mato Grosso" },
                  { value: "MG", label: "Minas Gerais" },
                  { value: "PA", label: "Pará" },
                  { value: "PB", label: "Paraíba" },
                  { value: "PR", label: "Paraná" },
                  { value: "PE", label: "Pernambuco" },
                  { value: "PI", label: "Piauí" },
                  { value: "RJ", label: "Rio de Janeiro" },
                  { value: "RN", label: "Rio Grande do Norte" },
                  { value: "RS", label: "Rio Grande do Sul" },
                  { value: "RO", label: "Rondônia" },
                  { value: "RR", label: "Roraima" },
                  { value: "SC", label: "Santa Catarina" },
                  { value: "SP", label: "São Paulo" },
                  { value: "SE", label: "Sergipe" },
                  { value: "TO", label: "Tocantins" },
                ]}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Cidade
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Ribeirão Preto"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <Select
                name="Faixa etária"
                options={[
                  { label: "Todas as idades", value: "all" },
                  { label: "18 - 24 anos", value: "18-24" },
                  { label: "24 - 30 anos", value: "24-30" },
                  { label: "30 - 36 anos", value: "30-36" },
                  { label: "36 - 42 anos", value: "36-42" },
                  { label: "42 - 48 anos", value: "42-48" },
                  { label: "48 - 54 anos", value: "48-54" },
                  { label: "54 - 60 anos", value: "54-60" },
                  { label: "60 - 66 anos", value: "54-60" },
                  { label: "66 - 72 anos", value: "54-60" },
                  { label: "72 - 78 anos", value: "54-60" },
                  { label: "78 - 84 anos", value: "54-60" },
                ]}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Tipo de consulta
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Consulta simples"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Data de envio de e-mails
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Ribeirão Preto"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <Select
                name="Porcentagem de promoção"
                options={[
                  { label: "10%", value: "10" },
                  { label: "Até 1500", value: "1500" },
                  { label: "Até 3000", value: "3000" },
                  { label: "Até 5000", value: "5000" },
                ]}
              />
            </div>

            <div className="select-div">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Mensagem
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Ex: Para meus pacientes da Spital ofereço 20% de desconto em minha consulta simples!"
              ></textarea>
            </div>

            <div className="select-div">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Preço total
              </label>
              <p className="email-marketing-price">
                R$ 250,00 para atingir 6.000 pacientes
              </p>
            </div>
          </form>
          <h2 className="subtitle-revenue" style={{ marginTop: "3rem" }}>
            Dados do cartão:
          </h2>
          <form className="email-form">
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Número do cartão
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: 1234 5678 9101 1121"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                CVC
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: 123"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Data de expiração
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: 12/28"
                style={{ height: "5.5rem" }}
              />
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: 123.456.789-10"
                style={{ height: "5.5rem" }}
              />
            </div>
          </form>
          <button className="email-marketing-button">Promover campanha</button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
