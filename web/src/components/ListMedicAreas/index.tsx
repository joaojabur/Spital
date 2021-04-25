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
      label: "Nefrologia",
      gotTo: "/busca/nefrologistas",
    },
    {
      img: urologyIcon,
      label: "Nefrologia",
      gotTo: "/busca/urologistas",
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
