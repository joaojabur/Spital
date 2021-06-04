import React from "react";
import "./styles.css";
import { useAuth } from "../../context/AuthProvider";
import { useModal } from "../../context/ModalProvider";
import { IoLogOutOutline } from "react-icons/io5";

interface HorizontalHeaderProps {
  title: string;
}

const HorizontalHeader = ({ title }: HorizontalHeaderProps) => {
  const { logout } = useAuth();
  const { spinner } = useModal();

  function logoutSpinner() {
    spinner.open();
    logout();
    spinner.close();
  }
  return (
    <div className="horizontal-header">
      <h1>{title}</h1>

      <div onClick={logoutSpinner} className="logout-button">
        <p>Sair</p>{" "}
        <IoLogOutOutline
          style={{
            position: "relative",
            top: "-0.45rem",
            marginLeft: "1rem",
          }}
          color="#fff"
          size={30}
        />
      </div>
    </div>
  );
};

export default HorizontalHeader;
