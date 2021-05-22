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

interface ListMedicAreasProps {
  searchTerm: string;
}

const ListMedicAreas = ({ searchTerm }: ListMedicAreasProps) => {
  const categories = [
    {
      img: eyeIcon,
      label: "Oftalmologista",
      gotTo: "oftalmologista",
    },
    {
      img: heartIcon,
      label: "Cardiologista",
      gotTo: "cardiologista",
    },
    {
      img: dentistIcon,
      label: "Dentista",
      gotTo: "dentista",
    },
    {
      img: earIcon,
      label: "Otorrinolaringologista",
      gotTo: "otorrinolaringologista",
    },
    {
      img: boneIcon,
      label: "Ortopedista",
      gotTo: "ortopedista",
    },
    {
      img: lungsIcon,
      label: "Pneumologista",
      gotTo: "pneumologista",
    },
    {
      img: brainIcon,
      label: "Neurologista",
      gotTo: "neurologista",
    },
    {
      img: sickIcon,
      label: "Geriatra",
      gotTo: "geriatra",
    },
    {
      img: kidneyIcon,
      label: "Nefrologista",
      gotTo: "nefrologista",
    },
    {
      img: urologyIcon,
      label: "Urologista",
      gotTo: "urologista",
    },
    {
      img: bloodIcon,
      label: "Hematologista",
      gotTo: "hematologista",
    },
    {
      img: bacteriaIcon,
      label: "Alergista e Imunologista",
      gotTo: "alergistas-e-imunologista",
    },
    {
      img: colonIcon,
      label: "Coloproctologista",
      gotTo: "coloproctologista",
    },
    {
      img: dermisIcon,
      label: "Demartologista",
      gotTo: "dermatologista",
    },
    {
      img: endocrinologyIcon,
      label: "Endocrinologista",
      gotTo: "endocrinologista",
    },
    {
      img: stomachIcon,
      label: "Gastroenterologista",
      gotTo: "gastroenterologista",
    },
    {
      img: gynecologyIcon,
      label: "Ginecologista",
      gotTo: "ginecologista",
    },
    {
      img: virusIcon,
      label: "Infectologista",
      gotTo: "infectologista",
    },
    {
      img: nutrologyIcon,
      label: "Nutrologista",
      gotTo: "nutrologista",
    },
    {
      img: obstetricsIcon,
      label: "Obstetricista",
      gotTo: "obstetricista",
    },
    {
      img: pediatricsIcon,
      label: "Pediatra",
      gotTo: "pediatra",
    },
    {
      img: radiologyIcon,
      label: "Radiologista",
      gotTo: "radiologista",
    },
    {
      img: radiotherapyIcon,
      label: "Radioterapista",
      gotTo: "radioterapista",
    },
    {
      img: muscleIcon,
      label: "Remautologista",
      gotTo: "remautologista",
    },
    {
      img: angiologyIcon,
      label: "Angiologista",
      gotTo: "angiologista",
    },
  ];

  return (
    <div className="list-medic-areas">
      {categories.map((categorie, index) => {
        let isIncluded = categorie.gotTo.includes(searchTerm.toLowerCase())
        return (
          <Link
            key={index}
            to={`/busca/${categorie.gotTo}`}
            className="list-medic-areas-unique"
            style={{display: isIncluded ? '' : 'none'}}
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
