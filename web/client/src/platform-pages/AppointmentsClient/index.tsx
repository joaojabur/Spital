import AppointmentStatus from "../../components/AppointmentStatus";
import HeaderPlatform from "../../components/HeaderPlatform";
import ListAppointments from "../../components/ListAppointments";
import "./styles.css";

const AppointmentsClient = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform title="Consultas agendadas" />
      <div className="container">
        <AppointmentStatus />
        <ListAppointments />
      </div>
    </div>
  );
};

export default AppointmentsClient;
