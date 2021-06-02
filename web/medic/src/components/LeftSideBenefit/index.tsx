import React from "react";
import "./styles.css";

interface BenefitProps {
  title: string;
  image: any;
  description: string;
}

const LeftSideBenefit = ({ title, image, description }: BenefitProps) => {
  return (
    <div className="left-side-benefit">
      <div className="left-side-benefit-presentation">
        <h2>{title}</h2>
        <img src={image} alt="Imagem de título" />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default LeftSideBenefit;
