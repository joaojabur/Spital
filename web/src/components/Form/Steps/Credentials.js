import React, { useState } from "react";
import "./styles.css";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";

const Credentials = ({ formData, setForm, navigation, checkErrors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, confirmPassword } = formData;
  const { next, previous } = navigation;

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="form-container">
      <div className="form-container-flex">
        <h2>Seus dados</h2>
        <IconButton
          onClick={() => {
            handleShowPassword();
          }}
          className="show-password-button"
          color="primary"
        >
          <span>{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
        </IconButton>
      </div>
      <div className="line"></div>
      <TextField
        name="email"
        label={<span style={{ fontSize: "1.5rem" }}>E-mail</span>}
        variant="outlined"
        fullWidth
        value={email}
        onChange={setForm}
        autoComplete="off"
        type="email"
        onBlur={checkErrors}
      />

      <TextField
        name="password"
        label={<span style={{ fontSize: "1.5rem" }}>Senha</span>}
        variant="outlined"
        fullWidth
        value={password}
        onChange={setForm}
        autoComplete="off"
        style={{ marginTop: "2rem" }}
        type={showPassword ? "text" : "password"}
      />

      <TextField
        name="confirmPassword"
        label={<span style={{ fontSize: "1.5rem" }}>Confirmar Senha</span>}
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={setForm}
        style={{ marginTop: "2rem" }}
        type={showPassword ? "text" : "password"}
      />
      <button
        className="secondary"
        onClick={() => {
          previous();
        }}
      >
        Anterior
      </button>
      <button
        className="primary"
        onClick={() => {
          next();
        }}
      >
        Próximo
      </button>
    </div>
  );
};

export default Credentials;
