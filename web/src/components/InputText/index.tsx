import React from "react";
import "./styles.css";

interface InputTextProps {
  label: string;
  placeHolder: string;
}

const InputText: React.FC<InputTextProps> = ({ label, placeHolder }) => {
  return (
    <div className="input-text">
      <p className="input-text-label">{label}</p>
      <input
        className="input-text-type"
        type="text"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default InputText;
