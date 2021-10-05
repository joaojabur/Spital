import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useModal } from "../../context/ModalProvider";
import api from "../../services/api";
import "./styles.css";

export default function ForgetPassword() {
  const { spinner } = useModal();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successfull, setSuccesfull] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    spinner.open();

    try {
      let response = await api.post("/users/recover/", { email });

      if (response.status === 200) {
        // Email enviado
      }

      setSuccesfull("E-mail enviado!");
    } catch (error: any) {
      if (error.response.data === "Not Found") {
        setSuccesfull("");
        setError("Usuário não encontrado");
      }
    }

    spinner.close();
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Seu e-mail</h2>
      <div className="line"></div>
      <TextField
        value={email}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>E-mail</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        autoComplete="off"
        required
        error={false}
      />
      <button className="recover-password-button">Recuperar senha</button>
      {error.length ? (
        <h1 style={{ color: "red", fontSize: "2rem" }}> {error} </h1>
      ) : null}

      {successfull.length > 0 && (
        <span
          style={{
            color: "#3EB713",
            marginTop: "2rem",
            fontSize: "2rem",
            position: "relative",
            textAlign: "center",
          }}
        >
          {successfull}
        </span>
      )}
    </form>
  );
}
