import React from "react";
import "./styles.css";

interface GreenButtonInterface {
  label: string;
}

const GreenButton = ({ label }: GreenButtonInterface) => {
  return <button className="green-button" type="button">{label}</button>;
};

export default GreenButton;
