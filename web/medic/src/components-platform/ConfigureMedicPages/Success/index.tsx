import happyImg from "../../../assets/images/happy.svg";
import "./styles.css";

const Success = () => {
  return (
    <div className="landing" id="landing-sucess">
      <h1 className="success-text">Sucesso!</h1>
      <p>
        Agora é só aproveitar nossa plataforma e aumentar seu número de
        consultas
      </p>
      <img alt="Sucesso!" src={happyImg} />

      <button
        onClick={() => {
          window.location.reload();
        }}
        className="next"
      >
        Vamos começar!
      </button>
    </div>
  );
};

export default Success;
