import React from "react";
import "./styles.css";

interface ColumnProps {
  title: string;
  data: Array<any>;
}

const Column = ({ title, data }: ColumnProps) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="column-data">
        {data.map((paragraph) => {
          return <p>{paragraph}</p>;
        })}
      </div>
    </div>
  );
};

export default Column;
