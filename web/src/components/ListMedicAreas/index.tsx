import "./styles.css";
import { Link } from "react-router-dom";
import doctorIcon from "../../assets/images/icons/hospital/svg/001-doctor.svg";
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

const ListMedicAreas = () => {
  const categories = [
    {
      img: doctorIcon,
      label: "Clínico Geral",
      gotTo: "/busca/clinicos-gerais",
    },
    {
      img: eyeIcon,
      label: "Oftalmologista",
      gotTo: "/busca/oftalmologistas",
    },
    {
      img: heartIcon,
      label: "Cardiologista",
      gotTo: "/busca/cardiologistas",
    },
    {
      img: dentistIcon,
      label: "Dentista",
      gotTo: "/busca/dentistas",
    },
    {
      img: earIcon,
      label: "Otorrinolaringologista",
      gotTo: "/busca/otorrinolaringologistas",
    },
    {
      img: boneIcon,
      label: "Ortopedista",
      gotTo: "/busca/ortopedistas",
    },
    {
      img: lungsIcon,
      label: "Pneumologista",
      gotTo: "/busca/pneumologistas",
    },
    {
      img: brainIcon,
      label: "Neurologista",
      gotTo: "/busca/neurologistas",
    },
    {
      img: sickIcon,
      label: "Geriatra",
      gotTo: "/busca/geriatras",
    },
    {
      img: kidneyIcon,
      label: "Nefrologista",
      gotTo: "/busca/nefrologistas",
    },
    {
      img: urologyIcon,
      label: "Urologista",
      gotTo: "/busca/urologistas",
    },
    {
      img: bloodIcon,
      label: "Hematologista",
      gotTo: "/busca/hematologistas",
    },
    {
      img: bacteriaIcon,
      label: "Alergista e Imunologista",
      gotTo: "/busca/alergistas-e-imunologistas",
    },
    {
      img: colonIcon,
      label: "Coloproctologista",
      gotTo: "/busca/coloproctologistas",
    },
    {
      img: dermisIcon,
      label: "Demartologista",
      gotTo: "/busca/dermatologistas",
    },
    {
      img: endocrinologyIcon,
      label: "Endocrinologista",
      gotTo: "/busca/endocrinologistas",
    },
    {
      img: stomachIcon,
      label: "Gastroenterologista",
      gotTo: "/busca/gastroenterologistas",
    },
    {
      img: gynecologyIcon,
      label: "Ginecologista",
      gotTo: "/busca/ginecologistas",
    },
    {
      img: virusIcon,
      label: "Infectologista",
      gotTo: "/busca/infectologistas",
    },
    {
      img: nutrologyIcon,
      label: "Nutrologista",
      gotTo: "/busca/nutrologistas",
    },
    {
      img: obstetricsIcon,
      label: "Obstetricista",
      gotTo: "/busca/obstetricistas",
    },
    {
      img: pediatricsIcon,
      label: "Pediatra",
      gotTo: "/busca/pediatra",
    },
    {
      img: radiologyIcon,
      label: "Radiologista",
      gotTo: "/busca/radiologistas",
    },
    {
      img: radiotherapyIcon,
      label: "Radioterapista",
      gotTo: "/busca/radioterapistas",
    },
    {
      img: muscleIcon,
      label: "Remautologista",
      gotTo: "/busca/remautologistas",
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
