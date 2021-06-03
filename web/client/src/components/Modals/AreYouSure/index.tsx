import Overlay from "../Overlay";
import "./styles.css";
import { IoCloseCircleOutline } from "react-icons/io5";

export interface AreYouSureProps {
  message: string;
  buttonMessage: string;
  close?: () => void;
  sureFunction: () => void;
}
export default function AreYouSure({
  close,
  message,
  sureFunction,
  buttonMessage,
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
            {buttonMessage}
          </button>
        </div>
      </div>
    </Overlay>
  );
}
