import { Switch } from "@material-ui/core";
import React from "react";
import Row from "../Row";
import TableHead from "../TableHead";
import "./styles.css";

interface TableProps {
  title: string;
  inputs: Array<InputProps>;
  switches?: Array<SwitchesProps>;
  data: any;
  head: any;
}

interface SwitchesProps {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Table = ({ title, inputs, switches, head, data }: TableProps) => {
  console.log(data);
  let keys;

  if (data) {
    keys = Object.keys(data[0]);
  }

  return (
    <div className="table">
      <h1 className="title-revenue">{title}</h1>
      <p className="subtitle-revenue">Fitlros para busca</p>
      <div className="table-inputs">
        {inputs.map((input) => {
          return (
            <div style={{ width: "95%" }} className="table-input-wrap">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                {input.label}
              </label>
              <div className="table-input-flex">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder={"Digite o(a) " + input.label.toLowerCase()}
                  value={input.value}
                  onChange={(e) => {
                    input.setValue(e.target.value);
                  }}
                />
              </div>
            </div>
          );
        })}

        {switches?.map((switche) => {
          return (
            <div className="switches-flex">
              <Switch
                checked={switche.value}
                onChange={(e) => {
                  switche.setValue(e.target.checked);
                }}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p>{switche.label}</p>
            </div>
          );
        })}
      </div>
      <h1 className="results-h1">Resultados:</h1>
      <table className="table-content">
        <TableHead keys={keys} head={head} />
        <tbody style={{ width: "100%" }}>
          {data?.map((record: any) => (
            <>
              <Row record={record} />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
