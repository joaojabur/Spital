import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import { useModal } from "../../context/ModalProvider";
import api from "../../services/api";
import validateRefreshBankAccount from "../../utils/validateRefreshBankAccount";

export interface EditBankAccountProps {
  bank_code: string;
  agencia: string;
  conta: string;
  conta_dv: string;
  document_number: string;
  legal_name: string;
}

const ConfigurationsBankAccount = () => {
  const [formError, setFormError] = useState("");
  const { spinner } = useModal();
  const { user } = useAuth();
  const [bankAccount, setBankAccount] = useState<EditBankAccountProps>({
    bank_code: "",
    agencia: "",
    conta: "",
    conta_dv: "",
    document_number: "",
    legal_name: "",
  });
  const [errors, setErrors] = useState(validateRefreshBankAccount(bankAccount));

  useEffect(() => {
    setErrors(validateRefreshBankAccount(bankAccount));
  }, [bankAccount]);

  async function handleSubmitRefreshConsult(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setFormError("Dados bancários incorretos.");
    } else {
      setFormError("");
      spinner.open();

      await api
        .put(`recipient/${user.recipientID}`, {
          bankAccount,
        })
        .then(async (response) => {
          if (response.status === 201) {
            spinner.close();
            window.location.reload();
          } else {
            setFormError("Erro ao atualizar dados bancários!")
          }
        });
    }
  }

  useEffect(() => {
    spinner.open();

    api
      .get(`/recipient?recipientID=${user.recipientID}`)
      .then((response: any) => {
        setBankAccount({
          ...bankAccount,
          bank_code: response.data.bank_account.bank_code,
          agencia: response.data.bank_account.agencia,
          conta: response.data.bank_account.conta,
          conta_dv: response.data.bank_account.conta_dv,
          document_number: response.data.bank_account.document_number,
          legal_name: response.data.bank_account.legal_name,
        });

        spinner.close();
      });
  }, []);

  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações da conta bancária" />
      <VerticalHeader colorIcon="configurations" />
      <div onSubmit={handleSubmitRefreshConsult} className="content">
        <form className="content-form">
          <h1>Atualize os dados de consulta</h1>
          <div style={{ width: "90%" }} className="line-global"></div>
          <TextField
            placeholder="310"
            value={bankAccount.bank_code}
            name="type"
            label={<span style={{ fontSize: "1.5rem" }}>Código do banco</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setBankAccount({ ...bankAccount, bank_code: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.bank_code ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.bank_code}</span>
            }
          />
          <TextField
            placeholder="7012"
            value={bankAccount.agencia}
            name="price"
            label={<span style={{ fontSize: "1.5rem" }}>Agência</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setBankAccount({ ...bankAccount, agencia: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.agencia ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.agencia}</span>
            }
          />
          <TextField
            placeholder="316991"
            value={bankAccount.conta}
            name="price"
            label={<span style={{ fontSize: "1.5rem" }}>Conta</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setBankAccount({ ...bankAccount, conta: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.conta ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.conta}</span>
            }
          />
          <TextField
            placeholder="Consulta simples"
            value={bankAccount.conta_dv}
            name="price"
            label={<span style={{ fontSize: "1.5rem" }}>Dígito da conta</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setBankAccount({ ...bankAccount, conta_dv: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.conta_dv ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.conta_dv}</span>
            }
          />

          <p
            style={{
              color: "#f00",
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "-1rem",
            }}
          >
            {formError}
          </p>

          <button className="submit-button" type="submit">
            Atualizar conta bancária
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigurationsBankAccount;
