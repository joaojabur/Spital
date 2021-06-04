import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";

const Profile = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="Meu Perfil" />
      <VerticalHeader colorIcon="profile" />
    </div>
  );
};

export default Profile;
