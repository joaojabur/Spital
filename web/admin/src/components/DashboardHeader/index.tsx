import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { BsBell } from "react-icons/bs";
import profileImg from "../../assets/images/profile.jpg";
import "./styles.css";
import { useState } from "react";

const DashboardHeader = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  function handleNotification() {
    setIsNotificationOpen(!isNotificationOpen);
  }

  return (
    <div className="dashboard-header">
      <div
        data-aos="fade-down"
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
        <img data-aos="zoom-in" src={profileImg} alt="Profile" />
        <p data-aos="zoom-in">João Jabur</p>
        <IconButton
          style={{
            border: "none",
            outline: "none",
            position: "relative",
            top: "0",
            left: "0",
          }}
        >
          <BsBell onClick={handleNotification} size={30} color="#333" />

          <div
            className={`notification-area ${
              isNotificationOpen ? "show-notification" : "not-show-notification"
            }`}
          ></div>
        </IconButton>
      </div>
    </div>
  );
};

export default DashboardHeader;
