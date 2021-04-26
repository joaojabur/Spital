import HeaderPlatform from "../../components/HeaderPlatform";
import MyProfileInfo from "../../components/MyProfileInfo";
import "./styles.css";

const MyProfile = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform title="Dê uma olhada aqui no seu próprio perfil" />
      <div className="container">
        <div className="container-perfil">
          <MyProfileInfo />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
