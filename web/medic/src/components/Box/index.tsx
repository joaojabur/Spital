import React from "react";
import "./index.css";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Box({ children, style }: BoxProps) {
  return (
    <div className="box" style={style}>
      {children}
    </div>
  );
}
