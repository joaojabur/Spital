import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import Box from "../../components/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "react-loader-spinner";

import { useAuth } from "../../context/AuthProvider";
import api from "../../services/api";

import config from "../../assets/images/information_tab.svg";

import "./styles.css";

interface Consult {
  type: string;
  price: number;
  description: string;
}

const Configurations = () => {
  const history = useHistory();
  const { userID, user } = useAuth();
  const [consults, setConsults] = useState<Array<Consult> | null>(null);
  const [loadingConsults, setLoadingConsults] = useState<boolean>(true);

  useEffect(() => {
    setLoadingConsults(true);
    api.get(`consult-type?medicID=${user.id}`).then((response: any) => {
      setConsults(response.data);
      setLoadingConsults(false);
    });
  }, [user.id]);

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="config">
      <HorizontalHeader title="Configurações" />
      <VerticalHeader colorIcon="configurations" />
      <div className="content">
        <Box style={{ position: "relative" }}>
          <h3>Dados da Clínica</h3>
          <div className="data">
            <p>
              <strong>Endereço:</strong>
              {user?.location?.address.replace("State of", "")}
            </p>
            <p>
              <strong>Número:</strong>
              {user?.location?.number}
            </p>
            <div className="clinic-data-edit-icon">
              <EditIcon
                fontSize="large"
                style={{
                  color: "#fff",
                }}
              />
            </div>
          </div>
        </Box>
        <Box>
          <h3>Dados Bancários</h3>
          <div className="data">
            <p>
              <strong>Conta: </strong>**********
            </p>
            <p>
              <strong>Número: </strong>**********
            </p>
          </div>
        </Box>
        <Box>
          <h3>Dados de Consulta</h3>
          <div className="data">
            {loadingConsults ? (
              <Loader
                type="TailSpin"
                color="var(--color-button-primary)"
                height={100}
                width={100}
              />
            ) : (
              consults!.map((consult, i) => {
                return (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span>{consult?.type}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p>
                        {consult?.description
                          ? consult?.description
                          : "Essa Consulta não possui uma descrição"}
                      </p>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <p>Preço: {consult?.price}</p>
                        <div className="consult-edit-icon">
                          <EditIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </div>
        </Box>
      </div>
      <img src={config} alt="Config" className="config-image" />
    </div>
  );
};

export default Configurations;
