import React from "react";
import "./styles.css";
import { useAuth } from "../../context/AuthProvider";

const MyProfileInfo = () => {
  const { user } = useAuth();

  return (
    <div className="my-profile-info">
      <div className="my-profile-info-image"></div>
      <h2 className="my-profile-info-name">
        {user.firstName} {user.lastName}
      </h2>
      <div className="my-profile-info-level">
        <h2>Nível</h2>
        <div className="my-profile-info-level-data">
          <div className="my-profile-info-level-data-flex">
            <p>Nível 21</p>
            <p>350 / 500</p>
          </div>
          <div className="my-profile-info-level-data-bar">
            <div
              className="my-profile-info-level-data-bar-fill"
              style={{ width: 70 + "%" }}
            >
              <span>350</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileInfo;
