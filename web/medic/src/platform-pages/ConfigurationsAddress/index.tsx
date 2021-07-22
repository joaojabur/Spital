import React, { useEffect } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { useState } from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import { useModal } from "../../context/ModalProvider";
import { useAuth } from "../../context/AuthProvider";
import refreshAddressValidate from "../../utils/validateRefreshAddress";
import Loader from "react-loader-spinner";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

export interface RefreshAddress {
  street: string;
  number: string;
}

const ConfigurationsAddress = () => {
  const history = useHistory();
  const { userID, user } = useAuth();
  const { spinner, sucesso } = useModal();
  const [addressID, setAddressID] = useState("");

  const [refreshAddress, setRefreshAddress] = useState<RefreshAddress>({
    street: "",
    number: "",
  });
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState(refreshAddressValidate(refreshAddress));

  useEffect(() => {
    api.get(`addresses?userID=${userID}`).then((response: any) => {
      setAddressID(response.data.id);
      setRefreshAddress({
        ...refreshAddress,
        street: response.data.address,
        number: response.data.number,
      });
    });
  }, [userID]);

  useEffect(() => {
    setErrors(refreshAddressValidate(refreshAddress));
  }, [refreshAddress]);

  const handleSelect = async (value: any) => {
    setRefreshAddress({
      ...refreshAddress,
      street: value,
    });
  };

  async function handleSubmitRefreshAddress(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setFormError("Endereço ou número incorreto");
    } else {
      setFormError("");
      spinner.open();

      await api
        .put(`addresses/${addressID}`, {
          address: refreshAddress.street,
          number: refreshAddress.number,
        })
        .then(async () => {
          await spinner.close();
          await sucesso.open({
            name: `Parabéns ${user.firstName}`,
            description: "Consulta atualizada com sucesso!",
            close: () => sucesso.close(),
          });
          await history.push("/configuracoes");
        });
    }
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações de consultas" />
      <VerticalHeader colorIcon="configurations" />
      <div className="content">
        <form onSubmit={handleSubmitRefreshAddress} className="content-form">
          <h1>Atualize os dados de consulta simples</h1>
          <div
            style={{ width: "90%", marginBottom: "2rem" }}
            className="line-global"
          ></div>
          <PlacesAutocomplete
            value={refreshAddress.street}
            onChange={async (e) => {
              setRefreshAddress({ ...refreshAddress, street: e });
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
                  error={errors.street ? true : false}
                  helperText={errors.street}
                  name="street"
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

                  {suggestions.map((suggestion: any) => {
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
              </div>
            )}
          </PlacesAutocomplete>
          <TextField
            placeholder="123"
            value={refreshAddress.number}
            name="number"
            label={<span style={{ fontSize: "1.5rem" }}>Número</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setRefreshAddress({ ...refreshAddress, number: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "83%" }}
            error={errors?.number ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.number}</span>
            }
          />

          <p
            style={{
              color: "#f00",
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "-1rem",
            }}
          >
            {formError}
          </p>

          <button className="submit-button" type="submit">
            Atualizar consulta
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigurationsAddress;
