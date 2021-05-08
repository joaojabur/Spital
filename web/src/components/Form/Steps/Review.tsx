import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../../services/api";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
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
  const { sucesso } = useModal();
  const { signup } = useAuth();
  const { userData, setUserData } = useShareClientForm();

  const history = useHistory();

  async function handleSubmitClient() {
    let response = await signup({ ...userData, xp: 0 });

    console.log(response);
  }

  const [hasError, setHasError] = useState(false);

  const hashedPassword = getPasswordAsterisk(userData?.password ?? "");

  const [errors, setErrors] = useState(validateInfo(userData));

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
      sucesso.open({
        name: userData.firstName + userData.lastName,
        close: () => {
          sucesso.close();
          history.push('/confirmar-email');
        }
      });
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
        userInfo={[{ type: "Telefone celular", info: userData?.phoneNumber }]}
        index={2}
        changePage={changePage}
      />

      <p>
        {hasError ? (
          <span style={{ color: "red" }}>O formulário possui erros...</span>
        ) : (
          <span></span>
        )}
      </p>

      <button className="secondary" onClick={(e) => previousPage()}>
        Anterior
      </button>

      <button className="primary" onClick={handleSubmitForm}>
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
