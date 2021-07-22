import { useState } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import Loader from "react-loader-spinner";
import Table from "../../components-platform/Table";
import { useEffect } from "react";
import api from "../../services/api";
import { removeDuplicates } from "../../utils/removeDuplicates.js";

const Pacients = () => {
  const [id, setId] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<Array<any>>([
    {
      id: 0,
      phoneNumber: "",
      first_name: "",
      last_name: "",
    },
  ]);

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api.get(`pacients?medicID=${user.id}`).then((response) => {
      const uniqueValues = removeDuplicates(response.data);
      setData(uniqueValues);
      setLoading(false);
    });
  }, [user.id]);

  if (!user.configured) {
    history.replace("/configurar");
  }

  const newDataArray = data.filter((obj) => {
    return (
      obj.phoneNumber
        .replace(/[- ()]/g, "")
        .toLowerCase()
        .includes(phone.toLowerCase()) &&
      obj.last_name.toLowerCase().includes(surname.toLowerCase()) &&
      obj.id.toString().toLowerCase().includes(id.toLowerCase())
    );
  });

  return (
    <div className="agenda">
      <HorizontalHeader title="Pacientes" />
      <VerticalHeader colorIcon="pacients" />
      <div className="content">
        {loading ? (
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={30}
            width={30}
          />
        ) : (
          <Table
            data={newDataArray}
            head={{
              id: "ID do usuário",
              phoneNumber: "Telefone celular",
              first_name: "Nome do paciente",
              last_name: "Sobrenome do paciente",
            }}
            title="BUSCAR PACIENTE"
            inputs={[
              { label: "ID do paciente", value: id, setValue: setId },
              { label: "Sobrenome", value: surname, setValue: setSurname },
              { label: "Telefone", value: phone, setValue: setPhone },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Pacients;
