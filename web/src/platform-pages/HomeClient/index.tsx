import Categories from "../../components/Categories";
import DoctorList from "../../components/DoctorList";
import HeaderPlatform from "../../components/HeaderPlatform";
import "./styles.css";

const HomeClient = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform />
      <div className="container">
        <Categories />
        <DoctorList />
      </div>
    </div>
  );
};

export default HomeClient;
