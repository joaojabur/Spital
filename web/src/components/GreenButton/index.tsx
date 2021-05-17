import React, { useState } from "react";
import "./styles.css";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";

interface GreenButtonInterface {
  label: string;
  getMonth: () => number;
  year: string;
  monthDay: string;
  nextPage: () => void;
}

const GreenButton = ({
  label,
  getMonth,
  year,
  monthDay,
  nextPage,
}: GreenButtonInterface) => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const [error, setError] = useState("");

  const month = getMonth();

  function verifyAppointmentData() {
    if (!appointmentData?.type || !appointmentData?.time) {
      setError("Consulta ou horário não selecionado(s)");
    } else {
      setError("");
      setAppointmentData({
        ...appointmentData,
        date: `${monthDay}/${month}/${year}`,
      });
      nextPage();
    }
  }

  return (
    <>
      {error.length === 0 ? (
        <span></span>
      ) : (
        <div className="error-container">
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={verifyAppointmentData}
        className="green-button"
        type="button"
      >
        {label}
      </button>
    </>
  );
};

export default GreenButton;
