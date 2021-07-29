import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { BsBell } from "react-icons/bs";
import profileImg from "../../assets/images/profile.jpg";
import "./styles.css";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div
        style={{ marginLeft: "3rem", width: "30rem", marginTop: "1rem" }}
        className="mb-3"
      >
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Procurar
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Procure algo aqui..."
        />
      </div>
      <div className="profile-section">
        <img src={profileImg} alt="Profile" />
        <p>João Jabur</p>
        <IconButton style={{ border: "none", outline: "none" }}>
          <BsBell size={30} color="#333" />
        </IconButton>
      </div>
    </div>
  );
};

export default DashboardHeader;
