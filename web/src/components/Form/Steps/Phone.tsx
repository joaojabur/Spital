import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import "./styles.css";
import validateInfo from "../../../utils/validateInfo";
import mask from "../../../utils/mask";
import { useShareClientForm } from "../../../context/ShareClientFormProvider";

interface PhoneProps {
  nextPage: () => void;
  previousPage: () => void;
}

const Phone = ({ nextPage, previousPage }: PhoneProps) => {
  const { userData, setUserData } = useShareClientForm();

  const [errors, setErrors] = useState(validateInfo(userData))

  useEffect(() => {
    setErrors(validateInfo(userData));
  }, [ userData ])

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
      <button
        className="secondary"
        onClick={(e) => previousPage()}>Anterior</button>
      <button 
        className="primary"
        onClick={(e) => nextPage()}>Próximo</button>
    </div>
  );
};

export default Phone;
