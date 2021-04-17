import React, { useContext, useState } from "react";
import "./styles.css";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

import Loader from "react-loader-spinner";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DataContext from "../../../context/DataContext";
import { Link } from "react-router-dom";
import getPasswordAsterisk from "../../../utils/HashPassword";
import validateMedicInfo from "../../../utils/validateMedicInfo";

const Review = () => {
  const [backendError, setBackEndError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { medic } = useContext(DataContext);
  const history = useHistory();

  async function handleSubmitClient() {
    await api
      .post("medics", {
        first_name: medic.firstName,
        last_name: medic.lastName,
        email: medic.email,
        password: medic.password,
        phoneNumber: medic.phoneNumber,
        area: medic.area,
        graduation: medic.area,
        master_degree: medic.masterDegree,
        doctorate_degree: medic.doctorateDegree,
        cpf: medic.cpf,
        rg: medic.rg,
        birth_date: medic.birthDate,
        schedule: medic.schedule,
      })
      .catch((err) => {
        console.log(err.response.data);
        setBackEndError(err.response.data);
      });
  }

  const [hasError, setHasError] = useState(false);

  const hashedPassword = getPasswordAsterisk(medic.password);

  const errors = validateMedicInfo(medic);

  const formatedBirthDate = medic.birthDate.replace(/[-]/g, "/");

  async function handleSubmitForm(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);
    if (loopedErrors.length > 0) {
      console.log("There's an error");
      setHasError(true);
    } else {
      handleSubmitClient();
      setHasError(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Revise seus dados</h2>
      <div className="line"></div>
      <RenderAccordion
        summary="Nome e telefone"
        medicInfo={[
          { type: "Nome", info: medic.firstName },
          { type: "Sobrenome", info: medic.lastName },
          { type: "Telefone", info: medic.phoneNumber },
        ]}
        goTo="registrar-spital-medico"
      />
      <RenderAccordion
        summary="Credenciais"
        medicInfo={[
          { type: "E-mail", info: medic.email },
          { type: "Senha", info: hashedPassword },
        ]}
        goTo="registrar-spital-medico-1"
      />
      <RenderAccordion
        summary="Dados acadêmicos"
        medicInfo={[
          { type: "Área médica", info: medic.area },
          { type: "Graduação", info: medic.graduation },
          { type: "Mestrado", info: medic.masterDegree },
          { type: "Doutorado", info: medic.doctorateDegree },
        ]}
        goTo="registrar-spital-medico-2"
      />
      <RenderAccordion
        summary="Dados pessoais"
        medicInfo={[
          { type: "CPF", info: medic.cpf },
          { type: "RG", info: medic.rg },
          { type: "Data de nascimento", info: formatedBirthDate },
        ]}
        goTo="registrar-spital-medico-3"
      />

      <p>
        {hasError ? (
          <span
            style={{
              color: "red",
              position: "relative",
              top: "1rem",
              left: "1rem",
            }}
          >
            O formulário possui erros...
          </span>
        ) : backendError ? (
          <span
            style={{
              color: "red",
              position: "relative",
              top: "1rem",
              left: "1rem",
            }}
          >
            E-mail, cpf ou rg já cadastrados
          </span>
        ) : (
          <span></span>
        )}
      </p>

      <Link to="/registrar-spital-medico-4">
        <button className="secondary">Anterior</button>
      </Link>
      <button onClick={handleSubmitForm} className="primary">
        {isLoading ? (
          <Loader
            type="Circles"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000}
          />
        ) : (
          <p>Cadastrar</p>
        )}
      </button>
    </div>
  );
};

interface RenderAccorditionProps {
  summary: string;
  medicInfo: Array<{
    type: string;
    info: string;
  }>;
  goTo: string;
}

export const RenderAccordion: React.FC<RenderAccorditionProps> = ({
  summary,
  medicInfo,
  goTo,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <ListItemText>
            {medicInfo.map((data, index) => {
              return (
                <span
                  style={{ display: "block", fontWeight: "normal" }}
                  key={index}
                  className="dados"
                >
                  <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
                    {data.type}:
                  </span>
                  {data.info}
                </span>
              );
            })}
          </ListItemText>
          <Link to={`/${goTo}`}>
            <IconButton component="span" color="primary">
              <EditIcon className="editar-icone" />
            </IconButton>
          </Link>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Review;
