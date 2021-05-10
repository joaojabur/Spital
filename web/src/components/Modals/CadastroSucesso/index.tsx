import { IoClose } from "react-icons/io5";
import Overlay from "../Overlay";
import "./styles.css";
import { IoCheckmarkOutline } from "react-icons/io5";

export interface CadastroSucessoProps {
  name: string;
  close?: () => void;
}
export default function CadastroSucesso({ name, close }: CadastroSucessoProps) {
  return (
    <Overlay>
      <div className="modal-success">
        <div className="success-icon">
          <IoCheckmarkOutline color="#fff" size="7rem" />
        </div>
        <h1>Parabéns {name}!</h1>

        <p>Conta criada com sucesso.</p>

        <button onClick={close}>Continuar</button>
      </div>
    </Overlay>
  );
}
