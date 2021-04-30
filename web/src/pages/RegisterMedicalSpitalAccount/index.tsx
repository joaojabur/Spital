import React, { useState } from "react";
import "./styles.css";

import Header from "../../components/Header";
import MedicNames from "../../components/FormMedic/Steps/Names";

import ShareMedicFormProvider from "../../context/ShareMedicFormProvider";
import { useHistory } from "react-router-dom";
import MedicCredentials from "../../components/FormMedic/Steps/Credentials";
import MedicAcademicData from "../../components/FormMedic/Steps/AcademicData";
import MedicPersonalData from "../../components/FormMedic/Steps/PersonalData";
import MedicSchedule from "../../components/FormMedic/Steps/Schedule";
import MedicReview from "../../components/FormMedic/Steps/Review";

const RegisterMedicalSpitalNames = () => {
  const history = useHistory();
  const [ currentPage, setCurrentPage ] = useState(0);
  let pages: Array<JSX.Element> = [
    <MedicNames nextPage={nextPage} previousPage={previousPage}/>,
    <MedicCredentials nextPage={nextPage} previousPage={previousPage}/>,
    <MedicAcademicData nextPage={nextPage} previousPage={previousPage}/>,
    <MedicPersonalData nextPage={nextPage} previousPage={previousPage}/>,
    <MedicSchedule nextPage={nextPage} previousPage={previousPage}/>,
    <MedicReview changePage={changePage} previousPage={previousPage}/>
  ]

  function changePage(index: number){
    setCurrentPage(index);
  }
  function previousPage(){
    if (currentPage === 0){
      history.replace('/registrar-paciente');
    }

    setCurrentPage(currentPage - 1)
  }

  function nextPage(){
    if (currentPage + 1 < pages.length){
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="register-spital-container">
      <ShareMedicFormProvider>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={previousPage}
        />

        {
          pages[currentPage]
        }
      </ShareMedicFormProvider>
    </div>
  );
};

export default RegisterMedicalSpitalNames;
