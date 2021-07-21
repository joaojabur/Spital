import React, { SelectHTMLAttributes } from "react";
import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
  return (
    <div className="select-block">
      <p>{name}</p>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {
          options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })
        }
      </select>
    </div>
  );
};

export default Select;
