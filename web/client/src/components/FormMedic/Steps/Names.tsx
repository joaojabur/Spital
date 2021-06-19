import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import validateMedicInfo from "../../../utils/validateMedicInfo";
import mask from "../../../utils/mask";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";

interface MedicNamesProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicNames = ({ nextPage, previousPage }: MedicNamesProps) => {
  const { medicData, setMedicData } = useShareFormMedic();
  const [errors, setErrors] = useState(validateMedicInfo(medicData));

  useEffect(() => {
    setErrors(validateMedicInfo(medicData));
  }, [medicData]);

  return (
    <form className="form-container">
      <h2>Nome e telefone</h2>
      <div className="line"></div>
      <TextField
        placeholder="João"
        value={medicData?.firstName}
        name="firstName"
        label={<span style={{ fontSize: "1.5rem" }}>Nome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, firstName: e.target.value });
        }}
        autoComplete="off"
        required
        error={errors?.firstName ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.firstName}</span>
        }
      />

      <TextField
        placeholder="Nogueira"
        value={medicData?.lastName}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Sobrenome</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({ ...medicData, lastName: e.target.value });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors?.lastName ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.lastName}</span>
        }
      />

      <TextField
        placeholder="16 99999999"
        value={medicData?.phoneNumber}
        name="lastName"
        label={<span style={{ fontSize: "1.5rem" }}>Telefone celular</span>}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setMedicData({
            ...medicData,
            phoneNumber: mask(e.target.value, "(##) # ####-####"),
          });
        }}
        style={{ marginTop: "1rem" }}
        required
        error={errors?.phoneNumber ? true : false}
        helperText={
          <span style={{ fontSize: "1rem" }}>{errors?.phoneNumber}</span>
        }
      />

      <button className="primary" type="submit" onClick={(e) => nextPage()}>
        Próximo
      </button>
    </form>
  );
};

export default MedicNames;
