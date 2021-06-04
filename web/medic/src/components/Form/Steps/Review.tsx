import React, { useState } from "react";
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
import getPasswordAsterisk from "../../../utils/HashPassword";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";
import { useAuth } from "../../../context/AuthProvider";
import { useModal } from "../../../context/ModalProvider";

interface MedicReviewProps {
  changePage: (index: number) => void;
  previousPage: () => void;
}

const MedicReview = ({ changePage, previousPage }: MedicReviewProps) => {
  const [isThereBackendError, setIsThereBackendError] = useState(false);
  const [backendError, setBackEndError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { sucesso } = useModal();
  const { medicData } = useShareFormMedic();

  const history = useHistory();

  async function handleSubmitForm(e: any) {
    setIsLoading(true);
    e.preventDefault();
    const loopedErrors = Object.values(errors);
    if (loopedErrors.length > 0) {
      console.log("There's an error");
      setHasError(true);
    } else {
      setHasError(false);
      await api
        .post("medics", {
          ...medicData,
          xp: 0,
        })
        .then((response: any) => {
          if (response.data.success) {
            setIsThereBackendError(false);
            setBackEndError("");
            sucesso.open({
              name:
                "Parabéns " + medicData.firstName + " " + medicData.lastName,
              close: () => {
                sucesso.close();
                history.push("/confirmar-email");
              },
              description: "Conta criada com sucesso.",
            });
            setIsLoading(false);
          } else {
            setIsThereBackendError(true);
            setBackEndError(response.data.message);

            setIsLoading(false);
          }
        });
    }
  }

  const [hasError, setHasError] = useState(false);

  const hashedPassword = getPasswordAsterisk(medicData?.password ?? "");

  const [errors, setErrors] = useState(validateMedicInfo(medicData));

  const formatedBirthDate = medicData?.birthDate?.replace(/[-]/g, "/");

  return (
    <div className="form-container">
      <h2>Revise seus dados</h2>
      <div className="line"></div>
      <RenderAccordion
        summary="Nome e telefone"
        medicInfo={[
          { type: "Nome", info: medicData?.firstName },
          { type: "Sobrenome", info: medicData?.lastName },
          { type: "Telefone", info: medicData?.phoneNumber },
        ]}
        index={0}
        changePage={changePage}
      />
      <RenderAccordion
        summary="Credenciais"
        medicInfo={[
          { type: "E-mail", info: medicData?.email },
          { type: "Senha", info: hashedPassword },
        ]}
        index={1}
        changePage={changePage}
      />
      <RenderAccordion
        summary="Dados acadêmicos"
        medicInfo={[
          { type: "Área médica", info: medicData?.area },
          { type: "Graduação", info: medicData?.graduation },
          { type: "Mestrado", info: medicData?.masterDegree },
          { type: "Doutorado", info: medicData?.doctorateDegree },
        ]}
        index={2}
        changePage={changePage}
      />
      <RenderAccordion
        summary="Dados pessoais"
        medicInfo={[
          { type: "CPF", info: medicData?.cpf },
          { type: "RG", info: medicData?.rg },
          { type: "Data de nascimento", info: formatedBirthDate },
        ]}
        index={3}
        changePage={changePage}
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
        ) : (
          <span></span>
        )}
      </p>

      <p
        style={{
          color: "red",
          position: "relative",
          top: "1rem",
          left: "1rem",
        }}
      >
        {backendError}
      </p>

      <button className="secondary" onClick={(e) => previousPage()}>
        Anterior
      </button>
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
  index: number;
  changePage: (index: number) => void;
}

export const RenderAccordion: React.FC<RenderAccorditionProps> = ({
  summary,
  medicInfo,
  index,
  changePage,
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
          <button onClick={(e) => changePage(index)}>
            <IconButton component="span" color="primary">
              <EditIcon className="editar-icone" />
            </IconButton>
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MedicReview;
