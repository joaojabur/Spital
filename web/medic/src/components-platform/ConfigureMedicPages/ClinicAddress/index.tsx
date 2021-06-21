import { TextField } from "@material-ui/core";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import "./styles.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";

const ClinicAddress = ({ previousPage, nextPage }: PagesProps) => {
  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(medicDataConfigure.address);
    const latLng = await getLatLng(results[0]);
    setMedicDataConfigure({
      ...medicDataConfigure,
      lat: latLng.lat,
      lon: latLng.lng,
      address: value,
    });
  };

  return (
    <div
      style={{ justifyContent: "space-between", padding: "2.5rem" }}
      className="landing"
    >
      <div style={{ width: "100%" }}>
        <div className="landing-flex">
          <h1 className="landing-flex-h1">Endereço da clínica</h1>
        </div>
        <div className="line-global"></div>
        <div style={{ marginTop: "2rem" }} className="landing-flex">
          <PlacesAutocomplete
            value={medicDataConfigure.address}
            onChange={async (e) => {
              setMedicDataConfigure({ ...medicDataConfigure, address: e });
            }}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div style={{ width: "83%" }}>
                <TextField
                  {...getInputProps({ placeholder: "Digite o endereço" })}
                  fullWidth
                  label={<span style={{ fontSize: "1.5rem" }}>Endereço</span>}
                  variant="outlined"
                  error={errors.address ? true : false}
                  helperText={errors.address}
                />

                <div>
                  {loading && (
                    <Loader
                      type="TailSpin"
                      color="var(--color-button-primary)"
                      height={30}
                      width={30}
                    />
                  )}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      padding: "1rem",
                      border: "1px solid #1976d2",
                      transition: "all ease-in-out 0.2s",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
                <h1>Latitude: {medicDataConfigure.lat}</h1>
                <h1>Longitude: {medicDataConfigure.lon}</h1>
              </div>
            )}
          </PlacesAutocomplete>
          <TextField
            value={medicDataConfigure.number}
            onChange={(e) => {
              setMedicDataConfigure({
                ...medicDataConfigure,
                number: e.target.value,
              });
            }}
            style={{ width: "15%" }}
            label={<span style={{ fontSize: "1.5rem" }}>Número</span>}
            variant="outlined"
            error={errors.number ? true : false}
            helperText={errors.number}
          />
        </div>
      </div>
      <div className="landing-buttons">
        <button
          onClick={previousPage}
          style={{ width: "100%" }}
          className="previous"
        >
          Anterior
        </button>
        <button onClick={nextPage} style={{ width: "100%" }} className="next">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ClinicAddress;
