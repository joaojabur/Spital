import React from "react";
import Row from "../Row";
import TableHead from "../TableHead";
import "./styles.css";

interface TableProps {
  title: string;
  inputs?: Array<InputProps>;
  head?: any;
  data?: any;
}

interface InputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Table = ({ title, inputs, data, head }: TableProps) => {
  let keys;

  if (data.length !== 0) {
    keys = Object.keys(data[0]);
  }

  return (
    <div className="table">
      <h1>{title}</h1>
      <p>Filtros para busca:</p>
      <div className="table-inputs">
        {inputs?.map((input: InputProps) => {
          return (
            <div style={{ width: "95%" }} className="table-input-wrap">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                {input.label}
              </label>
              <div style={{ width: "95%" }} className="table-input-flex">
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
      </div>
      <div className="table-content">
        <TableHead head={head} keys={keys} />
        <tbody style={{ width: "100%" }}>
          {data?.map((record: any) => (
            <>
              <Row record={record} />
            </>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default Table;
