import React from "react";
import "./styles.css";
import { IoSettingsOutline, IoCardOutline } from "react-icons/io5";

const MyProfileSettings = () => {
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
      <div className="my-profile-settings-info"></div>
    </div>
  );
};

export default MyProfileSettings;
