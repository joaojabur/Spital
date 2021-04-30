import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import mask from "../../../utils/mask";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";

interface MedicPersonalDataProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicPersonalData = ({ nextPage, previousPage}: MedicPersonalDataProps) => {
  const { medicData, setMedicData }= useShareFormMedic();
  const [ errors, setErrors ] = useState(validateMedicInfo(medicData));

  useEffect(() => {
    setErrors(validateMedicInfo(medicData));
  }, [ medicData ])

  return (
    <form className="form-container">
      <h2>Dados pessoais</h2>
      <div className="line"></div>
      <TextField
        value={medicData?.cpf}
        placeholder="123.456.789-10"
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>CPF</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, cpf: mask(e.target.value, "###.###.###-##") });
        }}
        autoComplete="off"
        required
        error={errors?.cpf ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors?.cpf}</span>}
      />

      <TextField
        value={medicData?.rg}
        placeholder="12.345.678-9"
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>RG</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, rg: mask(e.target.value, "##.###.###-#") });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors?.rg ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors?.rg}</span>}
      />

      <input
        value={medicData?.birthDate}
        type="date"
        style={{ marginTop: "1rem" }}
        onChange={(e) => {
          setMedicData({ ...medicData, birthDate: e.target.value });
        }}
        autoComplete="off"
        name="phone"
      />

      <p
        style={{
          color: "#f44336",
          fontSize: "1rem",
          marginLeft: "1.5rem",
          fontWeight: "bold",
          marginTop: "0.5rem",
        }}
      >
        {errors?.birthDate}
      </p>

      <button className="secondary" 
        onClick={(e) => previousPage()}>
          Anterior
      </button>
      <button className="primary"
        onClick={(e) => nextPage()}>
          Próximo
      </button>
    </form>
  );
};

export default MedicPersonalData;
