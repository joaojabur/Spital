import React from "react";
import "./styles.css";
import { IoSettingsOutline, IoCardOutline } from "react-icons/io5";
import { TextField } from "@material-ui/core";
import { useAuth } from "../../context/AuthProvider";

const MyProfileSettings = () => {
  const { user } = useAuth();

  return (
    <div className="my-profile-settings">
      <div className="my-profile-settings-nav">
        <li>
          <IoSettingsOutline size={40} color="#07B3D6" />
          <span>Configurações da minha conta</span>
        </li>
        <li>
          <IoCardOutline size={30} color="#07B3D6" />
          <span>Meios de pagamento</span>
        </li>
      </div>
      <div className="my-profile-settings-info">
        <h2>Informações da conta</h2>
        <TextField
          value={user.firstName + " " + user.lastName}
          name="name"
          label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          error={false}
          style={{ width: "85%", marginLeft: "3rem" }}
        />

        <TextField
          value={user.email}
          name="email"
          label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          error={false}
          style={{ width: "85%", marginLeft: "3rem" }}
        />

        <TextField
          value={user.phoneNumber}
          name="phoneNumber"
          label={<span style={{ fontSize: "1.5rem" }}>Telefone</span>}
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
          error={false}
          style={{ width: "85%", marginLeft: "3rem" }}
        />

        <button type="button">Atualizar dados</button>
      </div>
    </div>
  );
};

export default MyProfileSettings;
