import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import validateInfo from "../../../utils/validateInfo";
import { useShareClientForm } from "../../../context/ShareClientFormProvider";

import "./styles.css";
interface NamesProps {
  nextPage: () => void;
  previousPage: () => void;
}

const Names = ({ nextPage, previousPage}: NamesProps) => {
  const { setUserData, userData } = useShareClientForm();
  const [errors, setErrors] = useState(validateInfo(userData))
  
  function validate(){
    setErrors(validateInfo(userData));
  }

  useEffect(() => {
    setErrors(validateInfo(userData));
  }, [ userData ])
  
  return (
    <form className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={userData?.firstName}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUserData({ ...userData, firstName: e.target.value });
          validate()
        }}
        autoComplete="off"
        required
        error={errors.firstName ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.firstName}</span>
        }
      />

      <TextField
        value={userData?.lastName}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUserData({ ...userData, lastName: e.target.value });
          validate()
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors.lastName ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.lastName}</span>}
      />
      <button 
        className="primary" 
        type="button"
        onClick={(e) => nextPage()}>
        Próximo
      </button>
    </form>
  );
};

export default Names;
