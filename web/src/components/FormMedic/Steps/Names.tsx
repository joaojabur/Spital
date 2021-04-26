import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Link } from "react-router-dom";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import mask from "../../../utils/mask";


const MedicNames = () => {
  const [ medic, setMedic] = useState<any>({});

  const errors = validateMedicInfo(medic);

  return (
    <form className="form-container">
      <h2>Nome e telefone</h2>
      <div className="line"></div>
      <TextField
        placeholder="João"
        value={medic.firstName}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, firstName: e.target.value });
        }}
        autoComplete="off"
        required
        error={errors.firstName ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.firstName}</span>
        }
      />

      <TextField
        placeholder="Nogueira"
        value={medic.lastName}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, lastName: e.target.value });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors.lastName ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors.lastName}</span>}
      />

      <TextField
        placeholder="16 99999999"
        value={medic.phoneNumber}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Telefone celular</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, phoneNumber: mask(e.target.value, "(##) # ####-####") });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors.phoneNumber ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.phoneNumber}</span>
        }
      />

      <Link to="/registrar-spital-medico-1">
        <button className="primary" type="submit">
          Próximo
        </button>
      </Link>
    </form>
  );
};

export default MedicNames;
