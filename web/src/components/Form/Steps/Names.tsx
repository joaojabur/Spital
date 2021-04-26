import React from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Link } from "react-router-dom";
import validateInfo from "../../../utils/validateInfo";
import { useShareClientForm } from "../../../context/ShareClientFormProvider";

const Names = () => {
  const { setUserData, userData } = useShareClientForm();

  validateInfo(userData);

  const errors = validateInfo(userData);

  return (
    <form className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={userData.firstName}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUserData({ ...userData, firstName: e.target.value });
        }}
        autoComplete="off"
        required
        error={errors.firstName ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.firstName}</span>
        }
      />

      <TextField
        value={userData.lastName}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUserData({ ...userData, lastName: e.target.value });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors.lastName ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.lastName}</span>}
      />
      <Link to="/registrar-spital-paciente-1">
        <button className="primary" type="submit">
          Próximo
        </button>
      </Link>
    </form>
  );
};

export default Names;
