import { useState, useContext } from "react";
import "./styles.css";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import DataContext from "../../../context/DataContext";
import { Link } from "react-router-dom";
import validateInfo from "../../../utils/validateInfo";

const Credentials = () => {
  const { setUser, user } = useContext(DataContext);

  const [showPassword, setShowPassword] = useState(false);

  const errors = validateInfo(user);

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
        value={user.email}
        name="email"
        label={<span style={{ fontSize: "1.5rem" }}>E-mail</span>}
        variant="outlined"
        fullWidth
        autoComplete="off"
        type="email"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        error={errors.email ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.email}</span>}
      />

      <TextField
        value={user.password}
        name="password"
        label={<span style={{ fontSize: "1.5rem" }}>Senha</span>}
        variant="outlined"
        fullWidth
        autoComplete="off"
        style={{ marginTop: "2rem" }}
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        error={errors.password ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.password}</span>}
      />

      <TextField
        value={user.confirmPassword}
        name="confirmPassword"
        label={<span style={{ fontSize: "1.5rem" }}>Confirmar Senha</span>}
        variant="outlined"
        fullWidth
        style={{ marginTop: "2rem" }}
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
          setUser({ ...user, confirmPassword: e.target.value });
        }}
        error={errors.confirmPassword ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.confirmPassword}</span>
        }
      />
      <Link to="/registrar-spital-paciente">
        <button className="secondary">Anterior</button>
      </Link>
      <Link to="/registrar-spital-paciente-2">
        <button className="primary">Próximo</button>
      </Link>
    </div>
  );
};

export default Credentials;
