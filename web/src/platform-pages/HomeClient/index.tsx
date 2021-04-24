import Categories from "../../components/Categories";
import HeaderPlatform from "../../components/HeaderPlatform";
import "./styles.css";

const HomeClient = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform />
      <div className="container">
        <Categories />
      </div>
    </div>
  );
};

export default HomeClient;
