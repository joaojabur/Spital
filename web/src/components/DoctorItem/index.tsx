import "./styles.css";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

export interface DoctorItemProps {
  medic: Medic;
}

interface Medic {
  firstName: string;
  email: number;
  phoneNumber: string;
  lastName: string;
  area: string;
  userID: number;
  distance: number;
  star: string;
}

const DoctorItem = ({ medic }: DoctorItemProps) => {
  const id = medic.userID;

  return (
    <Link to={`/medicos/${id}`} className="doctor-item">
      <div className="doctor-item-first">
        <div className="doctor-item-image">
          <img
            src={`https://avatars.dicebear.com/api/human/${
              medic.firstName + medic.lastName
            }.svg`}
            alt="Medic Profile"
          />
        </div>
        <div className="doctor-item-data">
          <h1>Dr. {medic.firstName}</h1>
          <span>{medic.area}</span>
          <div className="doctor-item-data-flex">
            <IoStar size={15} color="#FFC107" />
            <p className="doctor-item-data-rating">
              {medic?.star?.substring(0, 3)}
            </p>
          </div>
        </div>
        <div className="doctor-item-data-location">
          {medic.distance && (
            <p className="doctor-item-data-distance">
              {medic.distance.toFixed(1)} km
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DoctorItem;
