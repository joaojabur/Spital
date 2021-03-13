import { useContext } from "react";

import DataContext from "../../../context/DataContext";

import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Link } from "react-router-dom";

const Phone = () => {
  const { user, setUser } = useContext(DataContext);

  return (
    <div className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={user.phoneNumber}
        label={
          <span style={{ fontSize: "1.5rem" }}>Telefone celular (com DDD)</span>
        }
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUser({ ...user, phoneNumber: e.target.value });
        }}
        autoComplete="off"
        name="phone"
        required
      />
      <Link to="/registrar-spital-paciente-1">
        <button className="secondary">Anterior</button>
      </Link>
      <Link to="/registrar-spital-paciente-3">
        <button className="primary">Próximo</button>
      </Link>
    </div>
  );
};

export default Phone;
