import React from "react";
import "./styles.css";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";

type ConsultTypeProps = {
  type: string;
  price: string;
};

interface AppointmentTypeProps {
  consultTypes: Array<ConsultTypeProps>;
}

const AppointmentType = ({ consultTypes }: AppointmentTypeProps) => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();

  return (
    <>
      <div className="appointment-type">
        {consultTypes.map((consultType, index) => {
          return (
            <button
              value={consultType.type + ":" + consultType.price}
              key={index}
              className="appointment-type-unique"
              onClick={(e: any) => {
                const [type, price] = e.target.value.split(":");
                setAppointmentData({
                  ...appointmentData,
                  type: type,
                  price: price,
                });
              }}
            >
              <p>{consultType.type}</p>
              <p>R$ {consultType.price}</p>
            </button>
          );
        })}
      </div>

      <div className="chosenTime">
        Horário escolhido: <span>{appointmentData?.type}</span>
      </div>
    </>
  );
};

export default AppointmentType;
