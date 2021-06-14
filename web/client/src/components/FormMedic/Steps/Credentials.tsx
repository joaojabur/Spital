import { useState, useEffect } from "react";
import "./styles.css";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";

interface MedicCredentialsProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicCredentials = ({ nextPage, previousPage}: MedicCredentialsProps) => {

  const [showPassword, setShowPassword] = useState(false);
  const { medicData, setMedicData }= useShareFormMedic();
  const [ errors, setErrors ] = useState(validateMedicInfo(medicData));

  useEffect(() => {
    setErrors(validateMedicInfo(medicData));
  }, [ medicData ])

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="form-container">
      <div className="form-container-flex">
        <h2>Credenciais</h2>
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
        placeholder="email90@gmail.com"
        value={medicData?.email}
        name="email"
        label={<span style={{ fontSize: "1.5rem" }}>E-mail</span>}
        variant="outlined"
        fullWidth
        autoComplete="off"
        type="email"
        onChange={(e) => {
          setMedicData({ ...medicData, email: e.target.value });
        }}
        error={errors?.email ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors?.email}</span>}
      />

      <TextField
        placeholder="*********"
        value={medicData?.password}
        name="password"
        label={<span style={{ fontSize: "1.5rem" }}>Senha</span>}
        variant="outlined"
        fullWidth
        autoComplete="off"
        style={{ marginTop: "1rem" }}
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
          setMedicData({ ...medicData, password: e.target.value });
        }}
        error={errors?.password ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors?.password}</span>}
      />

      <TextField
        placeholder="*********"
        value={medicData?.confirmPassword}
        name="confirmPassword"
        label={<span style={{ fontSize: "1.5rem" }}>Confirmar Senha</span>}
        variant="outlined"
        fullWidth
        style={{ marginTop: "1rem" }}
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
          setMedicData({ ...medicData, confirmPassword: e.target.value });
        }}
        error={errors?.confirmPassword ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.confirmPassword}</span>
        }
      />

      <button className="secondary" 
        onClick={(e) => previousPage()}>
          Anterior
      </button>
      <button className="primary"
        onClick={(e) => nextPage()}>
          Próximo
      </button>
    </div>
  );
};

export default MedicCredentials;
