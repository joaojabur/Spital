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
import { useModal } from "../../context/ModalProvider";

export interface MedicSchedule {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

export interface Consult {
  id: number;
  type: string;
  price: number;
  description: string;
}

interface BankAccountProps {
  id: number;
  bank_code: string;
  agencia: string;
  agencia_dv: string | null;
  conta: string;
  conta_dv: string;
  type: string;
  document_type: string;
  document_number: string;
  legal_name: string;
}

interface RecipientProps {
  transfer_enable: boolean;
  last_transfer: any;
  transfer_interval: string;
  transfer_day: number;
  anticipatable_volume_percentage: number;
  bank_account: BankAccountProps;
  status: string;
}

const Configurations = () => {
  const history = useHistory();
  const { spinner } = useModal();
  const { user } = useAuth();
  const [consults, setConsults] = useState<Array<Consult> | null>(null);
  const [medicSchedule, setMedicSchedule] = useState<Array<MedicSchedule>>([]);
  const [loadingConsults, setLoadingConsults] = useState<boolean>(true);
  const [recipient, setRecipient] = useState<RecipientProps>({
    transfer_enable: true,
    last_transfer: null,
    transfer_interval: "weekly",
    transfer_day: 5,
    anticipatable_volume_percentage: 0,
    bank_account: {
      id: 0,
      bank_code: "",
      agencia: "",
      agencia_dv: null,
      conta: "",
      conta_dv: "",
      type: "",
      document_type: "",
      document_number: "",
      legal_name: "",
    },
    status: "",
  });

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

  useEffect(() => {
    spinner.open();
    api
      .get(`/recipient?recipientID=${user.recipientID}`)
      .then((response: any) => {
        setRecipient(response.data);
        spinner.close();
      });
  }, []);

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
              <strong>Nome da conta: </strong>
              {recipient.bank_account.legal_name.toUpperCase()}
            </p>
            <p>
              <strong>Número do banco: </strong>
              {recipient.bank_account.bank_code}
            </p>
            <p>
              <strong>Agencia: </strong>
              {recipient.bank_account.agencia}
            </p>
            <p>
              <strong>Conta: </strong>
              {recipient.bank_account.conta}
            </p>
            <p>
              <strong>Número: </strong>
              {recipient.bank_account.conta_dv}
            </p>
            <p>
              <strong>Tipo de conta: </strong>
              {recipient.bank_account.type.replace("_", " ").toUpperCase()}
            </p>

            <Link
              to="/configuracoes/conta-bancaria"
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
