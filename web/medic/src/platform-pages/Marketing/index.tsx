import { useEffect, useState } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import Select from "../../components/Select";
import validateEmailData from "../../utils/validateEmailData";
import "./styles.css";

interface EmailDataProps {
  pacients: string;
  subject: string;
  state: string;
  city: string;
  age: string;
  type: string;
  date: string;
  porcentage: string;
  message: string;
}

interface CardProps {
  number: string;
  cvc: string;
  expirationDate: string;
  cpf: string;
}

const Marketing = () => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState<EmailDataProps>({
    pacients: "500",
    subject: "Promoção",
    state: "São Paulo",
    city: "",
    age: "all",
    type: "",
    date: "",
    porcentage: "0",
    message: "",
  });
  const [card, setCard] = useState<CardProps>({
    number: "",
    cvc: "",
    expirationDate: "",
    cpf: "",
  });

  const [errors, setErrors] = useState(validateEmailData(emailData));

  useEffect(() => {
    setErrors(validateEmailData(emailData));
  }, [emailData]);

  function promoteCampaign() {
    setLoading(true);
    const loopedErrors = Object.values(errors);
    if (loopedErrors.length > 0) {
      setHasError(true);
      setLoading(false);
    } else {
      setHasError(false);
      console.log(emailData);
      console.log(card);
      setLoading(false);
    }
  }

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
                value={emailData.pacients}
                onChange={(e) => {
                  setEmailData({ ...emailData, pacients: e.target.value });
                }}
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
                value={emailData.subject}
                onChange={(e) => {
                  setEmailData({ ...emailData, subject: e.target.value });
                }}
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
                value={emailData.state}
                onChange={(e) => {
                  setEmailData({ ...emailData, state: e.target.value });
                }}
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
                value={emailData.city}
                onChange={(e) => {
                  setEmailData({ ...emailData, city: e.target.value });
                }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Ribeirão Preto"
                style={{ height: "5.5rem" }}
              />
              <p className="error">{errors.city}</p>
            </div>
            <div className="select-div">
              <Select
                value={emailData.age}
                onChange={(e) => {
                  setEmailData({ ...emailData, age: e.target.value });
                }}
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
                value={emailData.type}
                onChange={(e) => {
                  setEmailData({ ...emailData, type: e.target.value });
                }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Consulta simples"
                style={{ height: "5.5rem" }}
              />
              <p className="error">{errors.type}</p>
            </div>
            <div className="select-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Data de envio de e-mails
              </label>
              <input
                value={emailData.date}
                onChange={(e) => {
                  setEmailData({ ...emailData, date: e.target.value });
                }}
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: Ribeirão Preto"
                style={{ height: "5.5rem" }}
              />
              <p className="error">{errors.date}</p>
            </div>
            <div className="select-div">
              <Select
                value={emailData.porcentage}
                onChange={(e) => {
                  setEmailData({ ...emailData, porcentage: e.target.value });
                }}
                name="Porcentagem de promoção"
                options={[
                  { label: "0%", value: "10" },
                  { label: "10%", value: "10" },
                  { label: "20%", value: "20" },
                  { label: "30%", value: "30" },
                  { label: "40%", value: "40" },
                  { label: "50%", value: "50" },
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
                value={emailData.message}
                onChange={(e) => {
                  setEmailData({ ...emailData, message: e.target.value });
                }}
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Ex: Para meus pacientes da Spital ofereço 20% de desconto em minha consulta simples!"
              ></textarea>
              <p className="error">{errors.message}</p>
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
                value={card.number}
                onChange={(e) => {
                  setCard({ ...card, number: e.target.value });
                }}
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
                value={card.cvc}
                onChange={(e) => {
                  setCard({ ...card, number: e.target.value });
                }}
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
                value={card.expirationDate}
                onChange={(e) => {
                  setCard({ ...card, number: e.target.value });
                }}
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
                value={card.cpf}
                onChange={(e) => {
                  setCard({ ...card, number: e.target.value });
                }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ex: 123.456.789-10"
                style={{ height: "5.5rem" }}
              />
            </div>
          </form>
          <p
            style={{
              color: "#f00",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            {hasError && "O formulário possui erros"}
          </p>
          <button onClick={promoteCampaign} className="email-marketing-button">
            Promover campanha
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
