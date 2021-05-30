import Overlay from "../Overlay";
import "./styles.css";
import { IoCheckmarkOutline, IoCloseCircleOutline } from "react-icons/io5";

export interface AreYouSureProps {
  message: string;
  close?: () => void;
  sureFunction: () => void;
}
export default function AreYouSure({
  close,
  message,
  sureFunction,
}: AreYouSureProps) {
  return (
    <Overlay>
      <div className="are-you-sure">
        <IoCloseCircleOutline color="#f00" size="15rem" />
        <h1>Você tem certeza?</h1>
        <p>{message}</p>
        <div className="are-you-sure-flex">
          <button
            onClick={close}
            type="button"
            className="are-you-sure-button are-you-sure-no"
          >
            Cancelar
          </button>
          <button
            onClick={sureFunction}
            type="button"
            className="are-you-sure-button are-you-sure-yes"
          >
            Deletar
          </button>
        </div>
      </div>
    </Overlay>
  );
}
