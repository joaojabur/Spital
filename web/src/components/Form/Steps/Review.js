import React from "react";
import "./styles.css";

import getPasswordAsterisk from "../../../utils/Replace";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const Review = ({ formData, navigation }) => {
  const { go, previous } = navigation;

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
  } = formData;

  const asteriskPassword = getPasswordAsterisk(password);
  const asteriskConfirmPassword = getPasswordAsterisk(confirmPassword);

  return (
    <div className="form-container">
      <h2>Revise seus dados</h2>
      <div className="line"></div>
      <RenderAccordion
        go={go}
        summary="Nomes"
        details={[
          {
            Nome: firstName,
          },
          {
            Sobrenome: lastName,
          },
        ]}
      />
      <RenderAccordion
        go={go}
        summary="Credenciais"
        details={[
          {
            "E-mail": email,
          },
          {
            Senha: asteriskPassword,
          },
          {
            "Confirmar senha": asteriskConfirmPassword,
          },
        ]}
      />

      <RenderAccordion
        go={go}
        summary="Telefone celular"
        details={[
          {
            "Telefone celular": phone,
          },
        ]}
      />
      <button
        onClick={() => {
          previous();
        }}
        className="secondary"
      >
        Anterior
      </button>
      <button
        onClick={() => {
          go("submit");
        }}
        className="primary"
      >
        Cadastrar
      </button>
    </div>
  );
};

export const RenderAccordion = ({ go, summary, details }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {details.map((data, index) => {
            const objKey = Object.keys(data)[0];
            const objValue = data[objKey];

            return (
              <ListItemText key={index}>
                <span className="dados">{`${objKey}: ${objValue}`}</span>
              </ListItemText>
            );
          })}
          <IconButton
            onClick={() => {
              const summaryLowerCase = summary.toLowerCase();
              go(summaryLowerCase);
            }}
            component="span"
            color="primary"
          >
            <EditIcon className="editar-icone" />
          </IconButton>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Review;
