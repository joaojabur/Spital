import React, { useEffect } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useState } from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import refreshConsultValidate, {
  RefreshConsult,
} from "../../utils/validateRefreshConsult";
import { useModal } from "../../context/ModalProvider";
import { useAuth } from "../../context/AuthProvider";

export interface ParamsProps {
  id: string;
}

const ConfigurationsConsult = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { spinner, sucesso } = useModal();
  const { id } = useParams<ParamsProps>();
  const [refreshConsult, setRefreshConsult] = useState<RefreshConsult>({
    type: "",
    price: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    api.get(`consult-type/${id}`).then((response: any) => {
      setRefreshConsult({
        ...refreshConsult,
        type: response.data.type,
        price: response.data.price,
      });
    });
  }, [id]);

  const [errors, setErrors] = useState(refreshConsultValidate(refreshConsult));

  useEffect(() => {
    setErrors(refreshConsultValidate(refreshConsult));
  }, [refreshConsult]);

  async function handleSubmitRefreshConsult(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setFormError("Nome ou preço incorreto.");
    } else {
      setFormError("");
      spinner.open();

      await api
        .put(`consult-type/${id}`, {
          type: refreshConsult.type,
          price: refreshConsult.price,
        })
        .then(async () => {
          await spinner.close();
          await sucesso.open({
            name: `Parabéns ${user.firstName}`,
            description: "Consulta atualizada com sucesso!",
            close: () => sucesso.close(),
          });
          await history.push("/configuracoes");
        });
    }
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações de consultas" />
      <VerticalHeader colorIcon="configurations" />
      <div className="content">
        <form onSubmit={handleSubmitRefreshConsult} className="content-form">
          <h1>Atualize os dados de consulta</h1>
          <div style={{ width: "90%" }} className="line-global"></div>
          <TextField
            placeholder="Consulta simples"
            value={refreshConsult.type}
            name="type"
            label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setRefreshConsult({ ...refreshConsult, type: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.type ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.type}</span>
            }
          />
          <TextField
            placeholder="Consulta simples"
            value={refreshConsult.price}
            name="price"
            label={<span style={{ fontSize: "1.5rem" }}>Preço</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setRefreshConsult({ ...refreshConsult, price: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.price ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.price}</span>
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
            Atualizar consulta
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigurationsConsult;
