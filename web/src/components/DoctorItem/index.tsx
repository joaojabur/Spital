import "./styles.css";
import { IoStar, IoTimeOutline } from "react-icons/io5";

const DoctorItem = () => {
  return (
    <div className="doctor-item">
      <div className="doctor-item-first">
        <div className="doctor-item-image"></div>
        <div className="doctor-item-data">
          <h1>Dr. Jaison</h1>
          <span>Oftalmologista</span>
          <div className="doctor-item-data-flex">
            <IoStar size={15} color="#FFC107" />
            <p className="doctor-item-data-rating">5.0</p>
          </div>
        </div>
        <div className="doctor-item-data-location">
          <p className="doctor-item-data-distance">1.5 km</p>
          <div className="doctor-item-data-workload">
            <IoTimeOutline style={{ position: 'relative', right: '1rem' }} size={20} color="blueviolet" />
            <span>8:00 AM - 1:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorItem;
