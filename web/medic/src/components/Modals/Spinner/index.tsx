import React from "react";
import Loader from "react-loader-spinner";
import Overlay from "../Overlay";

export default function Spinner() {
  return (
    <Overlay>
      <Loader
        type="TailSpin"
        color="var(--color-button-primary)"
        height={100}
        width={100}
      />
    </Overlay>
  );
}
