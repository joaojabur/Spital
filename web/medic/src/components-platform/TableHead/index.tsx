import React from "react";

interface TableHeadProps {
  keys: any;
  head: any;
}

const TableHead = ({ keys, head }: TableHeadProps) => {
  const tableHead = head || {};
  return (
    <thead>
      <tr>
        {keys?.map((key: any) => {
          return <th key={key}>{tableHead[key] || key}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
