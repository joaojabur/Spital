import React, { useState, useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import validateInfo from "../../utils/validateInfo";

import Names from "./Steps/Names";
import Credentials from "./Steps/Credentials";
import Phone from "./Steps/Phone";
import Review from "./Steps/Review";
import Submit from "./Steps/Submit";

function SubmitData(data) {
  console.log({ data });
}

const formStepData = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
};

const steps = [
  {
    id: "nomes",
  },
  {
    id: "credenciais",
  },
  {
    id: "telefone celular",
  },
  {
    id: "revisão",
  },
  {
    id: "submit",
  },
];

const Form = () => {
  const [errors, setErrors] = useState({});
  const [formData, setForm] = useForm(formStepData);
  const { step, navigation } = useStep({
    steps: steps,
    initialStep: 0,
  });

  const CheckErrors = () => {
    setErrors(validateInfo(formStepData));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      SubmitData(formStepData);
    }
  }, [errors]);

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "nomes":
      return <Names checkErrors={CheckErrors} {...props} />;
    case "credenciais":
      return <Credentials checkErrors={CheckErrors} {...props} />;
    case "telefone celular":
      return <Phone checkErrors={CheckErrors} {...props} />;
    case "revisão":
      return <Review checkErrors={CheckErrors} {...props} />;
    case "submit":
      return <Submit checkErrors={CheckErrors} />;
    default:
      break;
  }

  return (
    <div className="form">
      <h1>Multi Step Form</h1>
    </div>
  );
};

export default Form;
