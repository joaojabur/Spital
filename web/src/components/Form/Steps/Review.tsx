import React, { useContext, useEffect } from "react";
import "./styles.css";

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
import validateInfo from "../../../utils/validateInfo";

const Review = () => {
  const { user, setGlobalErrors, globalErrors } = useContext(DataContext);
  const hashedPassword = getPasswordAsterisk(user.password);

  const errors = validateInfo(user);

  useEffect(() => {
    setGlobalErrors(errors);
    console.log(globalErrors);
  }, []);

  return (
    <div className="form-container">
      <h2>Revise seus dados</h2>
      <div className="line"></div>
      <RenderAccordion
        summary="Nome"
        userInfo={[
          { type: "Nome", info: user.firstName },
          { type: "Sobrenome", info: user.lastName },
        ]}
        goTo="registrar-spital-paciente"
      />
      <RenderAccordion
        summary="Credenciais"
        userInfo={[
          { type: "E-mail", info: user.email },
          { type: "Senha", info: hashedPassword },
        ]}
        goTo="registrar-spital-paciente-1"
      />
      <RenderAccordion
        summary="Telefone"
        userInfo={[{ type: "Telefone celular", info: user.phoneNumber }]}
        goTo="registrar-spital-paciente-2"
      />

      <Link to="/registrar-spital-paciente-2">
        <button className="secondary">Anterior</button>
      </Link>
      <Link to="/registrar-spital-paciente-4">
        <button className="primary">Cadastrar</button>
      </Link>
    </div>
  );
};

interface RenderAccorditionProps {
  summary: string;
  userInfo: Array<{
    type: string;
    info: string;
  }>;
  goTo: string;
}

export const RenderAccordion: React.FC<RenderAccorditionProps> = ({
  summary,
  userInfo,
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
