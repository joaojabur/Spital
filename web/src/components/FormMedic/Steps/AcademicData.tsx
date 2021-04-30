import { useEffect, useState } from "react";


import TextField from "@material-ui/core/TextField";
import Select from "../../Select";
import "./styles.css";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";

interface MedicNamesProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicAcademicData = ({ nextPage, previousPage }: MedicNamesProps) => {
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

  const { medicData, setMedicData }= useShareFormMedic();
  const [ errors, setErrors ] = useState(validateMedicInfo(medicData));


  useEffect(() => {
    setErrors(validateMedicInfo(medicData));
  }, [ medicData ])

  return (
    <div className="form-container">
      <h2>Dados Acadêmicos</h2>
      <div className="line"></div>
      <Select
        name="week_day"
        onChange={(e: any) => setMedicData({ ...medicData, area: e.target.value })}
        value={medicData?.area}
        options={areaOptions}
      />

      <TextField
        placeholder="Universidade de São Paulo"
        value={medicData?.graduation}
        label={<span style={{ fontSize: "1.5rem" }}>Graduação</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, graduation: e.target.value });
        }}
        autoComplete="off"
        name="graduação"
        error={errors?.graduation ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.graduation}</span>
        }
      />

      <TextField
        value={medicData?.masterDegree}
        placeholder="Universidade de Campinas"
        label={<span style={{ fontSize: "1.5rem" }}>Mestrado (opcional)</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, masterDegree: e.target.value });
        }}
        autoComplete="off"
        name="mestrado"
        error={errors?.masterDegree ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.masterDegree}</span>
        }
      />

      <TextField
        value={medicData?.doctorateDegree}
        placeholder="Universidade Estadual Paulista"
        label={<span style={{ fontSize: "1.5rem" }}>Doutorado (opcional)</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, doctorateDegree: e.target.value });
        }}
        autoComplete="off"
        name="phone"
        error={errors?.doctorateDegree ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.doctorateDegree}</span>
        }
      />

      <button className="secondary" 
        onClick={(e) => previousPage()}>
          Anterior
      </button>
      <button className="primary"
        onClick={(e) => nextPage()}>
          Próximo
      </button>
    </div>
  );
};

export default MedicAcademicData;
