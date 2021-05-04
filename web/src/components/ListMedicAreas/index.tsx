import "./styles.css";
import { Link } from "react-router-dom";
import eyeIcon from "../../assets/images/icons/hospital/svg/012-swollen.svg";
import heartIcon from "../../assets/images/icons/hospital/svg/016-heart.svg";
import dentistIcon from "../../assets/images/icons/hospital/svg/051-dentist.svg";
import earIcon from "../../assets/images/icons/hospital/svg/023-ear.svg";
import boneIcon from "../../assets/images/icons/hospital/svg/014-broken bone.svg";
import lungsIcon from "../../assets/images/icons/hospital/svg/041-lungs.svg";
import brainIcon from "../../assets/images/icons/hospital/svg/026-brain.svg";
import sickIcon from "../../assets/images/icons/hospital/svg/015-sick.svg";
import kidneyIcon from "../../assets/images/icons/hospital/svg/052-kidney.svg";
import urologyIcon from "../../assets/images/icons/hospital/svg/053-urology.svg";
import bloodIcon from "../../assets/images/icons/hospital/svg/044-blood bag.svg";
import virusIcon from "../../assets/images/icons/hospital/svg/005-virus.svg";
import colonIcon from "../../assets/images/icons/hospital/svg/054-colon.svg";
import dermisIcon from "../../assets/images/icons/hospital/svg/055-dermis.svg";
import endocrinologyIcon from "../../assets/images/icons/hospital/svg/056-endocrinology.svg";
import stomachIcon from "../../assets/images/icons/hospital/svg/057-stomach.svg";
import gynecologyIcon from "../../assets/images/icons/hospital/svg/058-gynecology.svg";
import bacteriaIcon from "../../assets/images/icons/hospital/svg/059-bacteria.svg";
import nutrologyIcon from "../../assets/images/icons/hospital/svg/060-nutrology.svg";
import obstetricsIcon from "../../assets/images/icons/hospital/svg/061-obstetrics.svg";
import pediatricsIcon from "../../assets/images/icons/hospital/svg/062-pediatrician.svg";
import radiologyIcon from "../../assets/images/icons/hospital/svg/025-x ray.svg";
import radiotherapyIcon from "../../assets/images/icons/hospital/svg/063-radiotherapy.svg";
import muscleIcon from "../../assets/images/icons/hospital/svg/064-muscle.svg";
import angiologyIcon from "../../assets/images/icons/hospital/svg/065-globulos-vermelhos.svg";

const ListMedicAreas = () => {
  const categories = [
    {
      img: eyeIcon,
      label: "Oftalmologista",
      gotTo: "/busca/oftalmologista",
    },
    {
      img: heartIcon,
      label: "Cardiologista",
      gotTo: "/busca/cardiologista",
    },
    {
      img: dentistIcon,
      label: "Dentista",
      gotTo: "/busca/dentista",
    },
    {
      img: earIcon,
      label: "Otorrinolaringologista",
      gotTo: "/busca/otorrinolaringologista",
    },
    {
      img: boneIcon,
      label: "Ortopedista",
      gotTo: "/busca/ortopedista",
    },
    {
      img: lungsIcon,
      label: "Pneumologista",
      gotTo: "/busca/pneumologista",
    },
    {
      img: brainIcon,
      label: "Neurologista",
      gotTo: "/busca/neurologista",
    },
    {
      img: sickIcon,
      label: "Geriatra",
      gotTo: "/busca/geriatra",
    },
    {
      img: kidneyIcon,
      label: "Nefrologista",
      gotTo: "/busca/nefrologista",
    },
    {
      img: urologyIcon,
      label: "Urologista",
      gotTo: "/busca/urologista",
    },
    {
      img: bloodIcon,
      label: "Hematologista",
      gotTo: "/busca/hematologista",
    },
    {
      img: bacteriaIcon,
      label: "Alergista e Imunologista",
      gotTo: "/busca/alergistas-e-imunologista",
    },
    {
      img: colonIcon,
      label: "Coloproctologista",
      gotTo: "/busca/coloproctologista",
    },
    {
      img: dermisIcon,
      label: "Demartologista",
      gotTo: "/busca/dermatologista",
    },
    {
      img: endocrinologyIcon,
      label: "Endocrinologista",
      gotTo: "/busca/endocrinologista",
    },
    {
      img: stomachIcon,
      label: "Gastroenterologista",
      gotTo: "/busca/gastroenterologista",
    },
    {
      img: gynecologyIcon,
      label: "Ginecologista",
      gotTo: "/busca/ginecologista",
    },
    {
      img: virusIcon,
      label: "Infectologista",
      gotTo: "/busca/infectologista",
    },
    {
      img: nutrologyIcon,
      label: "Nutrologista",
      gotTo: "/busca/nutrologista",
    },
    {
      img: obstetricsIcon,
      label: "Obstetricista",
      gotTo: "/busca/obstetricista",
    },
    {
      img: pediatricsIcon,
      label: "Pediatra",
      gotTo: "/busca/pediatra",
    },
    {
      img: radiologyIcon,
      label: "Radiologista",
      gotTo: "/busca/radiologista",
    },
    {
      img: radiotherapyIcon,
      label: "Radioterapista",
      gotTo: "/busca/radioterapista",
    },
    {
      img: muscleIcon,
      label: "Remautologista",
      gotTo: "/busca/remautologista",
    },
    {
      img: angiologyIcon,
      label: "Angiologista",
      gotTo: "/busca/angiologista",
    },
  ];

  return (
    <div className="list-medic-areas">
      {categories.map((categorie, index) => {
        return (
          <Link
            key={index}
            to={categorie.gotTo}
            className="list-medic-areas-unique"
          >
            <img src={categorie.img} alt={categorie.label} />
            <h2>{categorie.label}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default ListMedicAreas;
