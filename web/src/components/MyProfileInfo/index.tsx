import React from "react";
import "./styles.css";
import { useAuth } from "../../context/AuthProvider";
import calcPercentage from "../../utils/calcPercentage";

interface LevelProps {
  level: number;
  nextLevelXp: number;
}

const MyProfileInfo = () => {
  const { user } = useAuth();

  let nivel = Math.floor(user.xp ** (1 / 2) / 4 - 1);

  if (nivel === -1) {
    nivel = 1;
  }

  const levels = [
    {
      level: 1,
      nextLevelXp: 64,
    },
    {
      level: 2,
      nextLevelXp: 144,
    },
    {
      level: 3,
      nextLevelXp: 256,
    },
    {
      level: 4,
      nextLevelXp: 400,
    },
    {
      level: 5,
      nextLevelXp: 576,
    },
    {
      level: 6,
      nextLevelXp: 784,
    },
    {
      level: 7,
      nextLevelXp: 1024,
    },
    {
      level: 8,
      nextLevelXp: 1296,
    },
    {
      level: 9,
      nextLevelXp: 1600,
    },
    {
      level: 10,
      nextLevelXp: 1936,
    },
    {
      level: 11,
      nextLevelXp: 2304,
    },
    {
      level: 12,
      nextLevelXp: 3136,
    },
  ];

  const levelObj = levels.filter((obj: LevelProps) => obj.level === nivel);
  const porcentage = calcPercentage(levelObj[0].nextLevelXp, user.xp);

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
            <p>Nível {nivel === -1 ? 1 : nivel}</p>
            <p>
              {user.xp} / {levelObj[0].nextLevelXp}
            </p>
          </div>
          <div className="my-profile-info-level-data-bar">
            <div
              className="my-profile-info-level-data-bar-fill"
              style={{ width: porcentage + "%" }}
            >
              <span>{user.xp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileInfo;
