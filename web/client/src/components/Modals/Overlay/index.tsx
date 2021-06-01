import React from "react";
import "./style.css";

interface OverlayProps {
  children: React.ReactNode;
}

export default function Overlay({ children }: OverlayProps) {
  return <div className="modal-overlay">{children}</div>;
}
