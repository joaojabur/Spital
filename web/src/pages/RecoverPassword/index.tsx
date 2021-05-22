import { IconButton, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useModal } from "../../context/ModalProvider";
import api from "../../services/api";
import validateNewPassword from "../../utils/validateNewPassword";
import "./styles.css";

interface RecoverPasswordParams {
  token?: string;
}

export default function RecoverPassword() {
  const [showPassword, setShowPassword] = useState(false);

  let { token } = useParams<RecoverPasswordParams>();
  const { spinner } = useModal();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(validateNewPassword(newPassword));

  useEffect(() => {
    setErrors(validateNewPassword(newPassword));
  }, [newPassword]);

  function validate() {
    setErrors(validateNewPassword(newPassword));
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const history = useHistory();

  if (!token || (isValid !== null && !isValid)) {
    spinner.close();
    history.replace("/");
  }

  const verifyToken = useCallback(async () => {
    spinner.open();
    let response = await api.get(`/users/recover/${token}`);

    if (response.status === 202) {
      setIsValid(true);
    }

    setIsLoading(false);
    spinner.close();
  }, [setIsValid, token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (isLoading) {
    return <div></div>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    spinner.open();
    if (newPassword.password !== newPassword.confirmPassword) {
      spinner.close();
      return;
    }

    let response = await api.put(`/users/recover/${token}`, {
      password: newPassword.password,
    });

    if (response.status === 200) {
      console.log("Senha Mudada");
      history.replace("/");
    }

    spinner.close();
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div id="flex">
        <h2>Seu e-mail</h2>
        <IconButton
          onClick={() => {
            handleShowPassword();
          }}
          className="show-password-button"
          color="primary"
        >
          {showPassword ? "Esconder senha" : "Mostrar senha"}
        </IconButton>
      </div>

      <div className="line"></div>
      <TextField
        type={showPassword ? "text" : "password"}
        value={newPassword.password}
        name="password"
        label={<span style={{ fontSize: "1.5rem" }}>Nova senha</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setNewPassword({ ...newPassword, password: e.target.value });
          validate();
        }}
        autoComplete="off"
        required
        error={errors.password ? true : false}
        helperText={
          <span style={{ fontSize: "1.5rem" }}>{errors.password}</span>
        }
      />
      <TextField
        type={showPassword ? "text" : "password"}
        value={newPassword.confirmPassword}
        style={{ marginTop: "1rem" }}
        name="confirm_password"
        label={<span style={{ fontSize: "1.5rem" }}>Confirmar nova senha</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setNewPassword({ ...newPassword, confirmPassword: e.target.value });
          validate();
        }}
        autoComplete="off"
        required
        error={errors.confirmPassword ? true : false}
        helperText={
          <span style={{ fontSize: "1.5rem" }}>{errors.confirmPassword}</span>
        }
      />
      <button className="recover-password-button">Alterar senha</button>
    </form>
  );
}
