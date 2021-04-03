import { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import DataContext from "../../../context/DataContext";
import { Link } from "react-router-dom";
import validateMedicInfo from "../../../utils/validateMedicInfo";

const PersonalData = () => {
  const { setMedic, medic } = useContext(DataContext);

  const errors = validateMedicInfo(medic);

  return (
    <form className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={medic.cpf}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>CPF</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, cpf: e.target.value });
        }}
        autoComplete="off"
        required
        error={errors.cpf ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.cpf}</span>}
      />

      <TextField
        value={medic.rg}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>RG</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, rg: e.target.value });
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
