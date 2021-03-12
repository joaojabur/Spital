import React from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

const Phone = ({ formData, setForm, navigation }) => {
  const { phone } = formData;
  const { next, previous } = navigation;

  return (
    <div className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        label={<span style={{ fontSize: "1.5rem" }}>Telefone celular (com DDD)</span>}
        variant="outlined"
        fullWidth
        value={phone}
        onChange={setForm}
        autoComplete="off"
        name="phone"
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

export default Phone;

