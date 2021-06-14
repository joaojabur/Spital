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
      label: "Alergista e Imunologista",
      value: "Alergista e Imunologista",
    },
    {
      label: "Angiologista",
      value: "Angiologista",
    },
    {
      label: "Cardiologista",
      value: "Cardiologista",
    },
    {
      label: "Coloproctologista",
      value: "Coloproctologista",
    },
    {
      label: "Dermatologista",
      value: "Dermatologista",
    },
    {
      label: "Endocrinologista",
      value: "Endocrinologista",
    },
    {
      label: "Endoscopista",
      value: "Endoscopista",
    },
    {
      label: "Gastroenterologista",
      value: "Gastroenterologista",
    },
    {
      label: "Geriatra",
      value: "Geriatra",
    },
    {
      label: "Ginecologista",
      value: "Ginecologista",
    },
    {
      label: "Hematologista",
      value: "Hematologista",
    },
    {
      label: "Infectologista",
      value: "Infectologista",
    },
    {
      label: "Nefrologista",
      value: "Nefrologista",
    },
    {
      label: "Neurologista",
      value: "Neurologista",
    },
    {
      label: "Nutrologo",
      value: "Nutrologo",
    },
    {
      label: "Obstetricista",
      value: "Obstetricista",
    },
    {
      label: "Oftalmologista",
      value: "Oftalmologista",
    },
    {
      label: "Ortopedista",
      value: "Ortopedista",
    },
    {
      label: "Otorrinolaringologista",
      value: "Otorrinolaringologista",
    },
    {
      label: "Pediatra",
      value: "Pediatra",
    },
    {
      label: "Pneumologista",
      value: "Pneumologista",
    },
    {
      label: "Radiologista",
      value: "Radiologista",
    },
    {
      label: "Radioterapista",
      value: "Radioterapista",
    },
    {
      label: "Reumatologista",
      value: "Reumatologista",
    },
    {
      label: "Urologista",
      value: "Urologista",
    },
  ];

  const { medicData, setMedicData } = useShareFormMedic();
  const [errors, setErrors] = useState(validateMedicInfo(medicData));

  useEffect(() => {
    setErrors(validateMedicInfo(medicData));
  }, [medicData]);

  if (!medicData.area) {
    setMedicData((previousState) => ({
      ...previousState,
      area: areaOptions[0].label,
    }));
  }

  return (
    <div className="form-container">
      <h2>Dados Acadêmicos</h2>
      <div className="line"></div>
      <Select
        name="week_day"
        onChange={(e: any) =>
          setMedicData({ ...medicData, area: e.target.value })
        }
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

      <TextField
        value={medicData?.crm}
        placeholder="010201/SP"
        label={<span style={{ fontSize: "1.5rem" }}>CRM</span>}
        style={{ marginTop: "1rem" }}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, crm: e.target.value });
        }}
        autoComplete="off"
        name="phone"
        error={errors?.crm ? true : false}
        helperText={<span style={{ fontSize: "1rem" }}>{errors?.crm}</span>}
      />

      <button className="secondary" onClick={(e) => previousPage()}>
        Anterior
      </button>
      <button className="primary" onClick={(e) => nextPage()}>
        Próximo
      </button>
    </div>
  );
};

export default MedicAcademicData;
