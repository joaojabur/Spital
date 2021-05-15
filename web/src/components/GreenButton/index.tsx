import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

interface GreenButtonInterface {
  label: string;
  getMonth: () => number;
  year: string;
  monthDay: string;
}

const GreenButton = ({ label, getMonth, year, monthDay }: GreenButtonInterface) => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <Link to={`${path}/pagamento`} className="green-button" type="button">
      {label}
    </Link>
  );
};

export default GreenButton;
