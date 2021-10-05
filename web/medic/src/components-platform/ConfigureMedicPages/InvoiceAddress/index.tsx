import { TextField } from "@material-ui/core";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import "./styles.css";
import { useEffect, useState } from "react";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";
import Select from "react-select";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";
import mask from "../../../utils/mask";

export interface InvoiceAddressProps {
  street: string;
  streetNumber: string;
  complement: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
}

const InvoiceAddress = ({ previousPage, nextPage }: PagesProps) => {
  const [error, setError] = useState("");

  const estados = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espirito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];
  const [hasError, setHasError] = useState(false);
  const { userID } = useAuth();
  const [medicID, setMedicID] = useState("");

  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

  useEffect(() => {
    api.get(`medics?id=${userID}`).then((response: any) => {
      setMedicID(response.data.id);
    });
  }, [userID]);

  return (
    <div
      style={{ justifyContent: "space-between", padding: "2.5rem" }}
      className="landing"
    >
      <div style={{ width: "100%" }}>
        <div className="landing-flex">
          <h1 className="landing-flex-h1">Endereço de fatura</h1>
        </div>
        <div className="line-global"></div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <div style={{ width: "83%" }}>
            <TextField
              value={medicDataConfigure.invoiceAddress.street}
              placeholder="Digite o label da rua"
              fullWidth
              label={<span style={{ fontSize: "1.5rem" }}>Rua</span>}
              variant="outlined"
              error={errors?.invoiceAddress?.street ? true : false}
              helperText={errors?.invoiceAddress?.street}
              onChange={async (e) => {
                setMedicDataConfigure({
                  ...medicDataConfigure,
                  invoiceAddress: {
                    ...medicDataConfigure.invoiceAddress,
                    street: e.target.value,
                  } as InvoiceAddressProps,
                });
              }}
            />
          </div>

          <TextField
            value={medicDataConfigure.invoiceAddress.streetNumber}
            placeholder="Digite o número"
            style={{ width: "15%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Número</span>}
            variant="outlined"
            error={errors?.invoiceAddress?.streetNumber ? true : false}
            helperText={errors?.invoiceAddress?.streetNumber}
            onChange={async (e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                invoiceAddress: {
                  ...medicDataConfigure.invoiceAddress,
                  streetNumber: e.target.value,
                } as InvoiceAddressProps,
              });
            }}
          />
        </div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.invoiceAddress.complement}
            placeholder="Digite o complemento"
            style={{ width: "49%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Complemento</span>}
            variant="outlined"
            error={errors?.invoiceAddress?.complement ? true : false}
            helperText={errors?.invoiceAddress?.complement}
            onChange={async (e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                invoiceAddress: {
                  ...medicDataConfigure.invoiceAddress,
                  complement: e.target.value,
                } as InvoiceAddressProps,
              });
            }}
          />
          <TextField
            value={medicDataConfigure.invoiceAddress.district}
            placeholder="Digite o bairro"
            style={{ width: "49%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Bairro</span>}
            variant="outlined"
            error={errors?.invoiceAddress?.district ? true : false}
            helperText={errors?.invoiceAddress?.district}
            onChange={async (e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                invoiceAddress: {
                  ...medicDataConfigure.invoiceAddress,
                  district: e.target.value,
                } as InvoiceAddressProps,
              });
            }}
          />
        </div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <TextField
            value={medicDataConfigure.invoiceAddress.zipCode}
            placeholder="Digite o CEP"
            style={{ width: "25%" }}
            label={<span style={{ fontSize: "1.5rem" }}>CEP</span>}
            variant="outlined"
            error={errors?.invoiceAddress?.zipCode ? true : false}
            helperText={errors?.invoiceAddress?.zipCode}
            onChange={async (e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                invoiceAddress: {
                  ...medicDataConfigure.invoiceAddress,
                  zipCode: mask(e.target.value, "#####-###"),
                } as InvoiceAddressProps,
              });
            }}
          />
          <TextField
            value={medicDataConfigure.invoiceAddress.city}
            placeholder="Digite a cidade"
            style={{ width: "73%", marginBottom: "2rem" }}
            label={<span style={{ fontSize: "1.5rem" }}>Cidade</span>}
            variant="outlined"
            error={errors?.invoiceAddress?.city ? true : false}
            helperText={errors?.invoiceAddress?.city}
            onChange={async (e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                invoiceAddress: {
                  ...medicDataConfigure.invoiceAddress,
                  city: e.target.value,
                } as InvoiceAddressProps,
              });
            }}
          />
        </div>
        <Select
          name="week_day"
          onChange={(e: any) =>
            setMedicDataConfigure({
              ...medicDataConfigure,
              invoiceAddress: {
                ...medicDataConfigure.invoiceAddress,
                state: e,
              } as InvoiceAddressProps,
            })
          }
          options={estados}
          defaultValue={{
            label: "São Paulo",
            value: "SP",
          }}
        />
      </div>
      {hasError && (
        <span style={{ color: "#f00", fontWeight: "bold", fontSize: "2rem" }}>
          Existem erros no formulário
        </span>
      )}
      <span style={{ color: "#f00", fontWeight: "bold", fontSize: "2rem" }}>
        {error}
      </span>
      <div className="landing-buttons">
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>
        <button
          style={{ width: "100%" }}
          className="next"
        >
          Terminar configuração
        </button>
      </div>
    </div>
  );
};

export default InvoiceAddress;
