import "./styles.css";
import eyeIcon from "../../assets/images/icons/hospital/svg/012-swollen.svg";
import heartIcon from "../../assets/images/icons/hospital/svg/016-heart.svg";
import dentistIcon from "../../assets/images/icons/hospital/svg/051-dentist.svg";
import earIcon from "../../assets/images/icons/hospital/svg/023-ear.svg";
import boneIcon from "../../assets/images/icons/hospital/svg/014-broken bone.svg";
import { Link } from "react-router-dom";

const Categories = () => {
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
  ];

  return (
    <div className="categories">
      <div className="categories-text">
        <h1>Categorias</h1>
        <Link to="/busca">Veja tudo</Link>
      </div>
      <div className="categories-card">
        {categories.map((categorie, index) => {
          return (
            <Link
              key={index}
              to={categorie.gotTo}
              className="categories-card-unique"
            >
              <img src={categorie.img} alt={categorie.label} />
              <h2>{categorie.label}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
