import React, { useEffect, useState } from "react";
import "./styles.css";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";
import Loader from "react-loader-spinner";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { TextField } from "@material-ui/core";
import mask from "../../../utils/mask";
import { useModal } from "../../../context/ModalProvider";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";

export interface BankData {
  bankNumber: string;
  agencyNumber: string;
  accountNumber: string;
  accountCheckNumber: string;
  fullName: string;
  cpf: string;
  birthDate: string;
}

const BankData = ({ previousPage }: PagesProps) => {
  const { userID } = useAuth();
  const [medicID, setMedicID] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const { spinner } = useModal();
  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    api.get(`medics?id=${userID}`).then((response: any) => {
      setMedicID(response.data.id);
    });
  }, [userID]);

  function handleConfigureProfile() {
    spinner.open();
    if (!errors?.appointments?.length) {
      //@ts-ignore
      delete errors.appointments;
    }

    if (!errors?.schedule?.length) {
      //@ts-ignore
      delete errors.schedule;
    }

    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setHasError(true);
      spinner.close();
    } else {
      setHasError(false);
      let data = new FormData();

      data.append("file", medicDataConfigure.file);
      data.append("medicDataConfigure", JSON.stringify(medicDataConfigure));

      api
        .post(`configure-medic?medicID=${medicID}&userID=${userID}`, data)
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            console.log("Configurado com sucesso!");
            window.location.reload();
          } else {
            console.log("Informações bancárias incorretas...");
          }
          spinner.close();
        });
    }
  }

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

  return (
    <div
      style={{ justifyContent: "space-between", padding: "2.5rem" }}
      className="landing"
    >
      <div style={{ width: "100%" }}>
        <div className="landing-flex">
          <h1 className="landing-flex-h1">Dados bancários</h1>
        </div>
        <div className="line-global"></div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.bankData.bankNumber}
            style={{ width: "48%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Número do banco</span>}
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  bankNumber: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.bankNumber ? true : false}
            helperText={errors?.bankData?.bankNumber}
          />
          <TextField
            value={medicDataConfigure?.bankData?.agencyNumber}
            style={{ width: "48%" }}
            label={
              <span style={{ fontSize: "1.5rem" }}>Número da agência</span>
            }
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  agencyNumber: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.agencyNumber ? true : false}
            helperText={errors?.bankData?.agencyNumber}
          />
        </div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.bankData.accountNumber}
            style={{ width: "48%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Número da conta</span>}
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  accountNumber: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.accountNumber ? true : false}
            helperText={errors?.bankData?.accountNumber}
          />
          <TextField
            value={medicDataConfigure.bankData.accountCheckNumber}
            style={{ width: "48%" }}
            label={
              <span style={{ fontSize: "1.5rem" }}>
                Dígito verificador da conta
              </span>
            }
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  accountCheckNumber: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.accountCheckNumber ? true : false}
            helperText={errors?.bankData?.accountCheckNumber}
          />
        </div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.bankData.fullName}
            fullWidth
            label={<span style={{ fontSize: "1.5rem" }}>Nome completo</span>}
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  fullName: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.fullName ? true : false}
            helperText={errors?.bankData?.fullName}
          />
        </div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.bankData.cpf}
            style={{ width: "100%" }}
            label={<span style={{ fontSize: "1.5rem" }}>CPF</span>}
            variant="outlined"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  cpf: mask(e.target.value, "###.###.###-##"),
                } as BankData,
              });
            }}
            error={errors?.bankData?.cpf ? true : false}
            helperText={errors?.bankData?.cpf}
          />
        </div>
      </div>

      {hasError && (
        <span style={{ color: "#f00", fontWeight: "bold", fontSize: "2rem" }}>
          Existem erros no formulário
        </span>
      )}
      <span style={{ color: "#f00", fontWeight: "bold", fontSize: "2rem" }}>
        {error}
      </span>

      <div style={{ width: "100%" }}>
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>
        <button
          onClick={handleConfigureProfile}
          style={{ width: "100%" }}
          className="next"
        >
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={30} width={30} />
          ) : (
            "Configurar conta"
          )}
        </button>
      </div>
    </div>
  );
};

export default BankData;
