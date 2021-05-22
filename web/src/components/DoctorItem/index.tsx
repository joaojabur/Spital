import "./styles.css";
import { IoStar, IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export interface DoctorItemProps {
  medic: {
    firstName: string;
    email: number;
    phoneNumber: string;
    lastName: string;
    area: string;
    userID: number;
  };
}

const DoctorItem = ({ medic }: DoctorItemProps) => {
  const id = medic.userID;

  return (
    <Link to={`/medicos/${id}`} className="doctor-item">
      <div className="doctor-item-first">
        <div className="doctor-item-image"></div>
        <div className="doctor-item-data">
          <h1>Dr. {medic.firstName}</h1>
          <span>{medic.area}</span>
          <div className="doctor-item-data-flex">
            <IoStar size={15} color="#FFC107" />
            <p className="doctor-item-data-rating">5.0</p>
          </div>
        </div>
        <div className="doctor-item-data-location">
          <p className="doctor-item-data-distance">1.5 km</p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorItem;
