import React from "react";

import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Link } from "react-router-dom";
import validateInfo from "../../../utils/validateInfo";
import mask from "../../../utils/mask";
import { useShareClientForm } from "../../../context/ShareClientFormProvider";

const Phone = () => {
  const { userData, setUserData } = useShareClientForm();

  const errors = validateInfo(userData);

  return (
    <div className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={userData.phoneNumber}
        label={<span style={{ fontSize: "1.5rem" }}>Telefone celular</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUserData({
            ...userData,
            phoneNumber: mask(e.target.value, "(##) # ####-####"),
          });
        }}
        autoComplete="off"
        name="phone"
        error={errors.phoneNumber ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.phoneNumber}</span>
        }
      />
      <Link to="/registrar-spital-paciente-1">
        <button className="secondary">Anterior</button>
      </Link>
      <Link to="/registrar-spital-paciente-3">
        <button className="primary">Próximo</button>
      </Link>
    </div>
  );
};

export default Phone;
