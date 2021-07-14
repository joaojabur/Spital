import { useState } from "react";
import "./styles.css";

import MainHeader from "../../components/MainHeader";
import MedicNames from "../../components/Form/Steps/Names";

import ShareMedicFormProvider from "../../context/ShareMedicFormProvider";
import { useHistory } from "react-router-dom";
import MedicCredentials from "../../components/Form/Steps/Credentials";
import MedicAcademicData from "../../components/Form/Steps/AcademicData";
import MedicPersonalData from "../../components/Form/Steps/PersonalData";
import MedicSchedule from "../../components-platform/ConfigureMedicPages/Schedule";
import MedicReview from "../../components/Form/Steps/Review";

const RegisterMedicalSpitalNames = () => {
  const history = useHistory();
  const [ currentPage, setCurrentPage ] = useState(0);
  let pages: Array<JSX.Element> = [
    <MedicNames nextPage={nextPage} previousPage={previousPage}/>,
    <MedicCredentials nextPage={nextPage} previousPage={previousPage}/>,
    <MedicAcademicData nextPage={nextPage} previousPage={previousPage}/>,
    <MedicPersonalData nextPage={nextPage} previousPage={previousPage}/>,
    <MedicReview changePage={changePage} previousPage={previousPage}/>
  ]

  function changePage(index: number){
    setCurrentPage(index);
  }
  function previousPage(){
    if (currentPage === 0){
      history.replace('/');
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
        <MainHeader
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
