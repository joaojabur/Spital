import { useState } from "react";
import "./styles.css";

import Header from "../../components/Header";
import Names from "../../components/Form/Steps/Names";
import ShareClientFormProvider from "../../context/ShareClientFormProvider";
import Credentials from "../../components/Form/Steps/Credentials";
import { useHistory } from "react-router";
import Phone from "../../components/Form/Steps/Phone";
import Review from "../../components/Form/Steps/Review";

const RegisterPatientSpitalAccount = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);

  let pages: Array<JSX.Element> = [
    <Names nextPage={nextPage} previousPage={previousPage} />,
    <Credentials nextPage={nextPage} previousPage={previousPage} />,
    <Phone nextPage={nextPage} previousPage={previousPage} />,
    <Review previousPage={previousPage} changePage={changePage} />,
  ];

  function changePage(index: number) {
    setCurrentPage(index);
  }
  function previousPage() {
    if (currentPage === 0) {
      history.replace("/registrar-paciente");
    }

    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage + 1 < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="register-spital-container">
      <ShareClientFormProvider>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={previousPage}
        />
        {pages[currentPage]}
      </ShareClientFormProvider>
    </div>
  );
};

export default RegisterPatientSpitalAccount;
