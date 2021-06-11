import React, { useState, useEffect } from "react";
import "./styles.css";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Checkbox, IconButton, FormControlLabel } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import getPasswordAsterisk from "../../../utils/HashPassword";
import validateInfo from "../../../utils/validateInfo";
import { useShareClientForm } from "../../../context/ShareClientFormProvider";
import { useAuth } from "../../../context/AuthProvider";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/ModalProvider";

interface ReviewProps {
  previousPage: () => void;
  changePage: (index: number) => void;
}

const Review = ({ previousPage, changePage }: ReviewProps) => {
  const [backendError, setBackendError] = useState("");
  const { sucesso, spinner } = useModal();
  const { signup } = useAuth();
  const { userData } = useShareClientForm();

  const history = useHistory();

  async function handleSubmitClient() {
    let response = await signup({ ...userData, xp: 0 });
    console.log(response.data);
    spinner.close();

    if (response.status === 201) {
      setBackendError("");
      sucesso.open({
        name: "Parabéns " + userData.firstName + " " + userData.lastName,
        close: () => {
          sucesso.close();
          history.push("/confirmar-email");
        },
        description: "Conta criada com sucesso.",
      });
    } else {
      setBackendError(response.data.message);
    }
  }

  const [hasError, setHasError] = useState(false);

  const hashedPassword = getPasswordAsterisk(userData?.password ?? "");

  const [errors, setErrors] = useState(validateInfo(userData));

  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    setErrors(validateInfo(userData));
  }, [userData]);

  function handleSubmitForm(e: any) {
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
        summary="Nome"
        userInfo={[
          { type: "Nome", info: userData?.firstName },
          { type: "Sobrenome", info: userData?.lastName },
        ]}
        index={0}
        changePage={changePage}
      />
      <RenderAccordion
        summary="Credenciais"
        userInfo={[
          { type: "E-mail", info: userData?.email },
          { type: "Senha", info: hashedPassword },
        ]}
        index={1}
        changePage={changePage}
      />
      <RenderAccordion
        summary="Telefone"
        userInfo={[
          { type: "Telefone celular", info: userData?.phoneNumber },
          { type: "Data de nascimento", info: userData?.birthDate },
        ]}
        index={2}
        changePage={changePage}
      />

      <span style={{ color: "red" }}>
        {hasError && "O formulário possui erros"}
      </span>

      <span style={{ color: "#f00", fontSize: "2rem", fontWeight: "bold" }}>
        {backendError}
      </span>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Clique aqui para aceitar nossos Termos e Serviços"
      />

      <button className="secondary" onClick={(e) => previousPage()}>
        Anterior
      </button>

      <button
        style={!agreement ? { cursor: "not-allowed" } : {}}
        className="primary"
        onClick={handleSubmitForm}
        disabled={!agreement}
      >
        Cadastrar
      </button>
    </div>
  );
};

interface RenderAccorditionProps {
  summary: string;
  userInfo: Array<{
    type: string;
    info: string;
  }>;
  index: number;
  changePage: (index: number) => void;
}

export const RenderAccordion: React.FC<RenderAccorditionProps> = ({
  summary,
  userInfo,
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
            {userInfo.map((data, index) => {
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

export default Review;
