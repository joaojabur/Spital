import HeaderPlatform from "../../components/HeaderPlatform";
import MyProfileInfo from "../../components/MyProfileInfo";
import MyProfileSettings from "../../components/MyProfileSettings";
import "./styles.css";

const MyProfile = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform title="Dê uma olhada aqui no seu próprio perfil" />
      <div className="container">
        <div className="container-perfil">
          <MyProfileInfo />
          <MyProfileSettings />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
