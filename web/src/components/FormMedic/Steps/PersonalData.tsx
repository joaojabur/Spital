import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Link } from "react-router-dom";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import mask from "../../../utils/mask";

const PersonalData = () => {
  const [ medic, setMedic] = useState<any>({});

  const errors = validateMedicInfo(medic);

  return (
    <form className="form-container">
      <h2>Dados pessoais</h2>
      <div className="line"></div>
      <TextField
        value={medic.cpf}
        placeholder="123.456.789-10"
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>CPF</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, cpf: mask(e.target.value, "###.###.###-##") });
        }}
        autoComplete="off"
        required
        error={errors.cpf ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.cpf}</span>}
      />

      <TextField
        value={medic.rg}
        placeholder="12.345.678-9"
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>RG</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, rg: mask(e.target.value, "##.###.###-#") });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors.rg ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.rg}</span>}
      />

      <input
        value={medic.birthDate}
        type="date"
        style={{ marginTop: "1rem" }}
        onChange={(e) => {
          setMedic({ ...medic, birthDate: e.target.value });
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
        {errors.birthDate}
      </p>

      <Link to="/registrar-spital-medico-2">
        <button className="secondary" type="submit">
          Anterior
        </button>
      </Link>

      <Link to="/registrar-spital-medico-4">
        <button className="primary" type="submit">
          Próximo
        </button>
      </Link>
    </form>
  );
};

export default PersonalData;
