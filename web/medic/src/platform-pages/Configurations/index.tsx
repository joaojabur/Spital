import { useState, useEffect } from "react";
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

import "./styles.css";
import { Link } from "react-router-dom";

interface MedicSchedule {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

interface Consult {
  id: number;
  type: string;
  price: number;
  description: string;
}

const Configurations = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [consults, setConsults] = useState<Array<Consult> | null>(null);
  const [medicSchedule, setMedicSchedule] = useState<Array<MedicSchedule>>([]);
  const [loadingConsults, setLoadingConsults] = useState<boolean>(true);

  useEffect(() => {
    setLoadingConsults(true);
    api.get(`consult-type?medicID=${user.id}`).then((response: any) => {
      setConsults(response.data);
      setLoadingConsults(false);
    });
  }, [user.id]);

  useEffect(() => {
    setLoadingConsults(true);
    api.get(`medic-schedule?medicID=${user.id}`).then((response: any) => {
      setMedicSchedule(response.data);
    });
  }, [user.id]);

  function getWeekDay(dayNumber: number) {
    switch (dayNumber) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda-feira";
      case 2:
        return "Terça-feira";
      case 3:
        return "Quarta-feira";
      case 4:
        return "Quinta-feira";
      case 5:
        return "Sexta-feira";
      case 6:
        return "Sábado";
    }
  }

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="config">
      <HorizontalHeader title="Configurações" />
      <VerticalHeader colorIcon="configurations" />
      <div style={{ marginBottom: "2rem" }} className="content">
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
            <Link
              to="/configuracoes/endereco"
              className="clinic-data-edit-icon"
            >
              <EditIcon
                fontSize="large"
                style={{
                  color: "#fff",
                }}
              />
            </Link>
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
                  <Accordion key={i}>
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
                        <Link
                          to={`/configuracoes/consultas/${consult?.id}`}
                          className="consult-edit-icon"
                        >
                          <EditIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </Link>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </div>
        </Box>
        <Box style={{ marginTop: "1rem" }}>
          <h3>Horários semanais</h3>
          <div className="data">
            {loadingConsults ? (
              <Loader
                type="TailSpin"
                color="var(--color-button-primary)"
                height={100}
                width={100}
              />
            ) : (
              medicSchedule.map((schedule, i) => {
                const week_day = getWeekDay(schedule?.week_day);
                // FROM
                const totalFrom = Number(schedule?.from) / 60;
                const [totalFromHour, totalFromMinute] = totalFrom
                  .toString()
                  .split(".");
                const totalStringFromMinute = `${totalFromMinute}`;
                const formattedTotalFromMinute =
                  totalStringFromMinute.substring(0, 1);
                const FromMinute = Number(formattedTotalFromMinute) * 6;

                // TO
                const totalTo = Number(schedule?.to) / 60;
                const [totalToHour, totalToMinute] = totalTo
                  .toString()
                  .split(".");
                const totalStringToMinute = `${totalToMinute}`;
                const formattedTotalToMinute = totalStringToMinute.substring(
                  0,
                  1
                );
                const ToMinute = Number(formattedTotalToMinute) * 6;

                return (
                  <Accordion key={i}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span>{week_day}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p>
                        {totalFromHour}:{isNaN(FromMinute) ? "00" : FromMinute}{" "}
                        - {totalToHour}:{isNaN(ToMinute) ? "00" : ToMinute}
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
                        <Link
                          to={`/configuracoes/horarios/${schedule?.id}`}
                          className="consult-edit-icon"
                        >
                          <EditIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </Link>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Configurations;
