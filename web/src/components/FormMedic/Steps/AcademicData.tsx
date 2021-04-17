import { useContext } from "react";

import DataContext from "../../../context/DataContext";

import TextField from "@material-ui/core/TextField";
import Select from "../../Select";
import "./styles.css";
import { Link } from "react-router-dom";
import validateMedicInfo from "../../../utils/validateMedicInfo";

const AcademicData = () => {
  const areaOptions = [
    {
      label: "Alergia e Imunologia",
      value: "Alergia e Imunologia",
    },
    {
      label: "Angiologia",
      value: "Angiologia",
    },
    {
      label: "Cardiologia",
      value: "Cardiologia",
    },
    {
      label: "Coloproctologia",
      value: "Coloproctologia",
    },
    {
      label: "Dermatologia",
      value: "Dermatologia",
    },
    {
      label: "Endocrinologia",
      value: "Endocrinologia",
    },
    {
      label: "Endoscopia",
      value: "Endoscopia",
    },
    {
      label: "Gastroenterologia",
      value: "Gastroenterologia",
    },
    {
      label: "Geriatria",
      value: "Geriatria",
    },
    {
      label: "Ginecologia",
      value: "Ginecologia",
    },
    {
      label: "Hematologia",
      value: "Hematologia",
    },
    {
      label: "Infectologia",
      value: "Infectologia",
    },
    {
      label: "Nefrologia",
      value: "Nefrologia",
    },
    {
      label: "Neurologia",
      value: "Neurologia",
    },
    {
      label: "Nutrologia",
      value: "Nutrologia",
    },
    {
      label: "Obstetrícia",
      value: "Obstetrícia",
    },
    {
      label: "Oftalmologia",
      value: "Oftalmologia",
    },
    {
      label: "Ortopedia",
      value: "Ortopedia",
    },
    {
      label: "Otorrinolaringologia",
      value: "Otorrinolaringologia",
    },
    {
      label: "Pediatria",
      value: "Pediatria",
    },
    {
      label: "Pneumologia",
      value: "Pneumologia",
    },
    {
      label: "Radiologia",
      value: "Radiologia",
    },
    {
      label: "Radioterapia",
      value: "Radioterapia",
    },
    {
      label: "Reumatologia",
      value: "Reumatologia",
    },
    {
      label: "Urologia",
      value: "Urologia",
    },
  ];

  const { medic, setMedic } = useContext(DataContext);

  const errors = validateMedicInfo(medic);

  return (
    <div className="form-container">
      <h2>Dados Acadêmicos</h2>
      <div className="line"></div>
      <Select
        name="week_day"
        onChange={(e: any) => setMedic({ ...medic, area: e.target.value })}
        value={medic.area}
        options={areaOptions}
      />

      <TextField
        placeholder="Universidade de São Paulo"
        value={medic.graduation}
        label={<span style={{ fontSize: "1.5rem" }}>Graduação</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, graduation: e.target.value });
        }}
        autoComplete="off"
        name="graduação"
        error={errors.graduation ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.graduation}</span>
        }
      />

      <TextField
        value={medic.masterDegree}
        placeholder="Universidade de Campinas"
        label={<span style={{ fontSize: "1.5rem" }}>Mestrado (opcional)</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, masterDegree: e.target.value });
        }}
        autoComplete="off"
        name="mestrado"
        error={errors.masterDegree ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.masterDegree}</span>
        }
      />

      <TextField
        value={medic.doctorateDegree}
        placeholder="Universidade Estadual Paulista"
        label={<span style={{ fontSize: "1.5rem" }}>Doutorado (opcional)</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedic({ ...medic, doctorateDegree: e.target.value });
        }}
        autoComplete="off"
        name="phone"
        error={errors.doctorateDegree ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors.doctorateDegree}</span>
        }
      />

      <Link to="/registrar-spital-medico-1">
        <button className="secondary">Anterior</button>
      </Link>
      <Link to="/registrar-spital-medico-3">
        <button className="primary">Próximo</button>
      </Link>
    </div>
  );
};

export default AcademicData;
