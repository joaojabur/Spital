import { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import DataContext from "../../../context/DataContext";
import { Link } from "react-router-dom";

const Names = () => {
  const { setUser, user } = useContext(DataContext);

  return (
    <form className="form-container">
      <h2>Seus dados</h2>
      <div className="line"></div>
      <TextField
        value={user.firstName}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUser({ ...user, firstName: e.target.value });
        }}
        autoComplete="off"
        required
      />

      <TextField
        value={user.lastName}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value });
        }}
        style={{ marginTop: "2rem" }}
        required
      />
      <Link to="/registrar-spital-paciente-1">
        <button className="primary" type="submit">
          Próximo
        </button>
      </Link>
    </form>
  );
};

export default Names;
