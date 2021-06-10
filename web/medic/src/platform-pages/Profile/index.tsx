import React from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const Profile = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Meu Perfil" />
      <VerticalHeader colorIcon="profile" />
    </div>
  );
};

export default Profile;
