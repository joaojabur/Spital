import React, { useContext } from "react";
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

const Review = () => {
  const { user } = useContext(DataContext);

  return (
    <div className="form-container">
      <h2>Revise seus dados</h2>
      <div className="line"></div>
      <RenderAccordion
        summary="Nome"
        userInfo={[
          { type: "E-mail", info: user.email },
          { type: "E-mail", info: user.email },
        ]}
      />
      <RenderAccordion
        summary="Credenciais"
        userInfo={[
          { type: "E-mail", info: user.email },
          { type: "E-mail", info: user.email },
          { type: "E-mail", info: user.email },
        ]}
      />
      <RenderAccordion
        summary="Telefone"
        userInfo={[{ type: "E-mail", info: user.email }]}
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
}

export const RenderAccordion: React.FC<RenderAccorditionProps> = ({
  summary,
  userInfo,
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
                <span className="dados">
                  <span style={{ fontWeight: "bold" }}>{data.type}</span>
                  {data.info}
                </span>
              );
            })}
          </ListItemText>

          <IconButton component="span" color="primary">
            <EditIcon className="editar-icone" />
          </IconButton>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Review;
