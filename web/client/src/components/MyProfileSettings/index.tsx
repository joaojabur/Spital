import React, { useEffect, useState } from "react";
import "./styles.css";
import { IoSettingsOutline, IoCardOutline } from "react-icons/io5";
import { TextField } from "@material-ui/core";
import { useAuth } from "../../context/AuthProvider";
import refreshUserValidate from "../../utils/refreshUserValidate";
import mask from "../../utils/mask";
import api from "../../services/api";
import { useModal } from "../../context/ModalProvider";
import { PaymentMethodProps } from "../Modals/PaymentMethod";

const MyProfileSettings = () => {
  const { spinner, sucesso } = useModal();
  const { user, userID } = useAuth();
  const [refreshUser, setRefreshUser] = useState({
    fullName: `${user.firstName} ${user.lastName}`,
    email: `${user.email}`,
    phoneNumber: `${user.phoneNumber}`,
  });

  const [errors, setErrors] = useState(refreshUserValidate(refreshUser));
  const [formError, setFormError] = useState("");

  function validate() {
    setErrors(refreshUserValidate(refreshUser));
  }

  useEffect(() => {
    setErrors(refreshUserValidate(refreshUser));
  }, [refreshUser]);

  async function handleSubmitRefreshUser() {
    const loopedErrors = Object.values(errors);
    if (loopedErrors.length > 0) {
      setFormError("O formulário possui erros");
    } else {
      setFormError("");
      spinner.open();
      await api
        .put(`clients/${userID}`, {
          fullName: refreshUser.fullName,
          phoneNumber: refreshUser.phoneNumber,
        })
        .then(() => {
          spinner.close();
          sucesso.open({
            name: `Parabéns ${refreshUser.fullName}`,
            description: "Dados atualizados com sucesso!",
            close: () => sucesso.close(),
          });
        });
    }
  }

  return (
    <div className="my-profile-settings">
      <div className="my-profile-settings-nav">
        <button>
          <IoSettingsOutline size={40} color="#07B3D6" />
          <span>Configurações da minha conta</span>
        </button>
      </div>

      <div className="my-profile-settings-info">
        <h2>Informações da conta</h2>
        <TextField
          value={refreshUser.fullName}
          name="fullname"
          label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          onChange={(e) => {
            setRefreshUser({ ...refreshUser, fullName: e.target.value });
            validate();
          }}
          error={errors.fullName ? true : false}
          style={{ width: "85%", marginLeft: "3rem" }}
          helperText={
            <span style={{ fontSize: "1.5rem" }}>{errors.fullName}</span>
          }
        />

        <TextField
          value={refreshUser.email}
          name="email"
          label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          error={errors.email ? true : false}
          style={{ width: "85%", marginLeft: "3rem" }}
          helperText={
            <span style={{ fontSize: "1.5rem" }}>{errors.email}</span>
          }
        />

        <TextField
          value={refreshUser.phoneNumber}
          name="phoneNumber"
          label={<span style={{ fontSize: "1.5rem" }}>Telefone</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          onChange={(e) => {
            setRefreshUser({
              ...refreshUser,
              phoneNumber: mask(e.target.value, "(##) # ####-####"),
            });
            validate();
          }}
          error={errors.phoneNumber ? true : false}
          style={{ width: "85%", marginLeft: "3rem" }}
          helperText={
            <span style={{ fontSize: "1.5rem" }}>{errors.phoneNumber}</span>
          }
        />

        <button onClick={handleSubmitRefreshUser} type="button">
          Atualizar dados
        </button>
      </div>
    </div>
  );
};

export default MyProfileSettings;
