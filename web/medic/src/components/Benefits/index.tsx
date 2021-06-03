import React from "react";
import "./styles.css";

// dsadasdasda

const Benefits = () => {
  const lists = [
    {
      label:
        "A plataforma intermediará o agendamento de consultas entre você e seus pacientes;",
    },
    {
      label: "Seu perfil aparecerá para milhares de pacientes de sua região;",
    },
    {
      label: "Todas as consultas serão particulares (sem convênio médico);",
    },
    {
      label: "Um aplicativo/site de gestão de clínicas totalmente gratuito.",
    },
  ];

  return (
    <div className="benefits">
      <div className="container">
        <h1>Como proporcionaremos tais benefícios?</h1>
        <ul>
          {lists.map((list, index) => {
            return (
              <li className="benefit" key={index}>
                <div className="small-list-style"></div>
                {list.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Benefits;
