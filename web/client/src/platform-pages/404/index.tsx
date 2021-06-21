import React from "react";
import "./styles.css";
import image404 from "../../assets/images/404.svg";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>Página não encontrada...</h1>
      <img src={image404} />
      <p>
        Página ou usuário não encontrado. Podem ter sido excluídos, atualizados
        ou nem se quer ter existido.
      </p>
      <Link to="/">Voltar para página principal</Link>
    </div>
  );
};

export default Page404;
