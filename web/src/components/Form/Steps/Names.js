import React from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

const Names = ({ formData, setForm, navigation }) => {
  const { firstName, lastName } = formData;
  const { next } = navigation;

  return (
    <div className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={setForm}
        autoComplete="off"
        required
      />
      <TextField
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        value={lastName}
        onChange={setForm}
        style={{ marginTop: "2rem" }}
      />
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

export default Names;
