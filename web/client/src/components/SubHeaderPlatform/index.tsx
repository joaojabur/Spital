import "./styles.css";
import logo from "../../assets/images/logo.svg";
import returnIcon from "../../assets/images/icons/return.svg";

interface SubHeaderPlatformProps {
  title: string;
  returnFunction: () => void;
}

const SubHeaderPlatform = ({
  title,
  returnFunction,
}: SubHeaderPlatformProps) => {
  return (
    <div className="sub-header-platform">
      <img
        src={returnIcon}
        alt="Retornar"
        className="return"
        onClick={returnFunction}
      />

      <h1>{title}</h1>

      <img className="logo" src={logo} alt="Spital" />
    </div>
  );
};

export default SubHeaderPlatform;
