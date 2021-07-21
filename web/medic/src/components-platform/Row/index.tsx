import React from "react";
import "./styles.css";

interface RowProps {
  record: any;
}

const Row = ({ record }: RowProps) => {
  const keys = Object.keys(record);

  return (
    <tr>
      {keys.map((key) => {
        return (
          <>
            <td
              style={{
                backgroundColor: "rgba(7, 179, 214, 0.2)",
                padding: "2rem",
              }}
              key={key}
            >
              {record[key]}
            </td>
          </>
        );
      })}
    </tr>
  );
};

export default Row;
