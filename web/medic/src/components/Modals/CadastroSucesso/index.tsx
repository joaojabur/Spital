import { IoClose } from "react-icons/io5";
import Overlay from "../Overlay";
import "./styles.css";
import { IoCheckmarkOutline } from "react-icons/io5";

export interface CadastroSucessoProps {
  name: string;
  description: string;
  close?: () => any;
}
export default function CadastroSucesso({
  name,
  close,
  description,
}: CadastroSucessoProps) {
  return (
    <Overlay>
      <div className="modal-success">
        <div className="success-icon">
          <IoCheckmarkOutline color="#fff" size="7rem" />
        </div>
        <h1>{name}!</h1>

        <p>{description}</p>

        <button onClick={close}>Continuar</button>
      </div>
    </Overlay>
  );
}
