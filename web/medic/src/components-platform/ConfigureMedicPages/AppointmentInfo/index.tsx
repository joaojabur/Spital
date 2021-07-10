import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";
import "./styles.css";

const AppointmentInfo = ({ previousPage, nextPage }: PagesProps) => {
  const [appointmentError, setAppointmentError] = useState("");
  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

  function addNewAppointmentItem() {
    if (medicDataConfigure.appointments.length >= 3) {
      setAppointmentError("Número de tipos de consultas atingiu o limite");
    } else {
      setAppointmentError("");
      setMedicDataConfigure({
        ...medicDataConfigure,
        appointments: [
          ...medicDataConfigure.appointments,
          {
            name: "",
            price: "",
          },
        ],
      });
    }
  }

  function setAppointmentItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newAppointmentItems = medicDataConfigure.appointments.map(
      (appointment, index) => {
        if (index === position) {
          return { ...appointment, [field]: value };
        }
        return appointment;
      }
    );
    setMedicDataConfigure({
      ...medicDataConfigure,
      appointments: newAppointmentItems,
    });
  }

  console.log(errors);

  return (
    <div
      style={{ justifyContent: "space-between", padding: "2.5rem" }}
      className="landing"
    >
      <div style={{ width: "100%" }}>
        <div className="landing-flex">
          <h1 className="landing-flex-h1">
            Nos informe o preço e o nome de suas consultas
          </h1>
          <button onClick={addNewAppointmentItem} className="add-button">
            <IoAddOutline color="#07B3D6" size="2.5rem" />
            Novo
          </button>
        </div>
        <div className="line-global"></div>
        {medicDataConfigure.appointments.map((appointment, index) => {
          return (
            <>
              <div
                key={index}
                style={{ marginTop: "2rem" }}
                className="landing-flex"
              >
                <TextField
                  value={appointment.name}
                  style={{ width: "48%" }}
                  label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
                  variant="outlined"
                  onChange={(e: any) => {
                    setAppointmentItemValue(index, "name", e.target.value);
                  }}
                />
                <TextField
                  value={appointment.price}
                  style={{ width: "48%" }}
                  label={<span style={{ fontSize: "1.5rem" }}>Preço</span>}
                  variant="outlined"
                  onChange={(e: any) => {
                    setAppointmentItemValue(index, "price", e.target.value);
                  }}
                  type="number"
                />
              </div>
              <p
                style={{
                  margin: "2rem 0",
                  color: "#f00",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {errors.appointments.length >= index
                  ? errors.appointments[index]
                  : null}
              </p>
            </>
          );
        })}
      </div>
      <span style={{ color: "#f00", fontSize: "2rem" }}>
        {appointmentError}
      </span>
      <div className="landing-buttons">
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>
        <button onClick={nextPage} style={{ width: "100%" }} className="next">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default AppointmentInfo;
