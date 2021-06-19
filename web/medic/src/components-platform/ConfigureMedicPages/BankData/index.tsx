import React, { useEffect, useState } from "react";
import "./styles.css";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";
import Loader from "react-loader-spinner";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { TextField } from "@material-ui/core";
import mask from "../../../utils/mask";

export interface BankData {
  bankNumber: string;
  agencyNumber: string;
  accountNumber: string;
  accountCheckNumber: string;
  fullName: string;
  cpf: string;
  birthDate: string;
}

const BankData = ({ previousPage, nextPage }: PagesProps) => {
  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

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
            style={{ width: "48%" }}
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
          <TextField
            value={medicDataConfigure.bankData.birthDate}
            style={{ width: "48%" }}
            label={
              <span style={{ fontSize: "1.5rem" }}>Data de nascimento</span>
            }
            variant="outlined"
            type="date"
            onChange={(e: any) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                bankData: {
                  ...medicDataConfigure.bankData,
                  birthDate: e.target.value,
                } as BankData,
              });
            }}
            error={errors?.bankData?.birthDate ? true : false}
            helperText={errors?.bankData?.birthDate}
          />
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>
        <button onClick={nextPage} style={{ width: "100%" }} className="next">
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={30} width={30} />
          ) : (
            "Próximo"
          )}
        </button>
      </div>
    </div>
  );
};

export default BankData;
