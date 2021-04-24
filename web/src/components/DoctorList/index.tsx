import DoctorItem from "../DoctorItem";
import "./styles.css";

const DoctorList = () => {
  return (
    <div className="doctor-list">
      <div className="doctors-list-text">
        <h1>Médicos</h1>
      </div>
      <div className="doctors-list-content">
        <div className="doctors-list-unique">
          <DoctorItem />
        </div>
        <div className="doctors-list-unique">
          <DoctorItem />
        </div>
        <div className="doctors-list-unique">
          <DoctorItem />
        </div>
        <div className="doctors-list-unique">
          <DoctorItem />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
