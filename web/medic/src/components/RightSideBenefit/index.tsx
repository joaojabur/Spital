import React from "react";
import "./styles.css";

interface BenefitProps {
  title: string;
  image: any;
  description: string;
}

const RightSideBenefit = ({ title, image, description }: BenefitProps) => {
  return (
    <div className="right-side-benefit">
      <p>{description}</p>
      <div className="right-side-benefit-presentation">
        <h2>{title}</h2>
        <img src={image} alt="Imagem de título" />
      </div>
    </div>
  );
};

export default RightSideBenefit;
