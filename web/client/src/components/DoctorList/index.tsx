import { CircularProgress } from "@material-ui/core";
import Loader from "react-loader-spinner";
import DoctorItem from "../DoctorItem";
import "./styles.css";

interface DoctorListProps {
  medics: Array<Medic> | undefined;
  loading: boolean;
}

export interface Medic {
  firstName: string;
  email: string;
  phoneNumber: string;
  lastName: string;
  area: string;
  userID: number;
  distance: number;
  star: string;
  url: string;
}

const DoctorList = ({ medics, loading }: DoctorListProps) => {
  if (medics === undefined) {
    return <CircularProgress />;
  }

  return (
    <div className="doctor-list">
      <div className="doctors-list-text">
        <h1>Médicos</h1>
      </div>
      <div className="doctors-list-content">
        {medics?.map((medic, index) => {
          return (
            <div data-aos="fade-up" key={index} className="doctors-list-unique">
              <DoctorItem medic={medic}/>
            </div>
          );
        })}
      </div>
      <div className="doctors-list-loading">
        {loading && (
          <Loader
            type="ThreeDots"
            color="var(--color-button-primary)"
            height={100}
            width={100}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorList;
