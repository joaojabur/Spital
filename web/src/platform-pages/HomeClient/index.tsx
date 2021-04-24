import { useContext } from "react";
import HeaderPlatform from "../../components/HeaderPlatform";
import DataContext from "../../context/DataContext";
import "./styles.css";

const HomeClient = () => {
  const { loggedUser } = useContext(DataContext);

  return (
    <div className="client-platform">
      <HeaderPlatform />
    </div>
  );
};

export default HomeClient;
