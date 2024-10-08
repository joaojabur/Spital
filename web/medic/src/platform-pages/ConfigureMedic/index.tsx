import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppointmentInfo from "../../components-platform/ConfigureMedicPages/AppointmentInfo";
import BankData from "../../components-platform/ConfigureMedicPages/BankData";
import ClinicAddress from "../../components-platform/ConfigureMedicPages/ClinicAddress";
import Landing from "../../components-platform/ConfigureMedicPages/Landing";
import Success from "../../components-platform/ConfigureMedicPages/Success";
import MedicSchedule from "../../components-platform/ConfigureMedicPages/Schedule";
import { useAuth } from "../../context/AuthProvider";
import ShareMedicConfigureFormProvider from "../../context/ShareMedicConfigureFormProvider";
import "./styles.css";
import ProfileConfig from "../../components-platform/ConfigureMedicPages/ProfileConfig";

export interface PagesProps {
  nextPage: () => void;
  previousPage: () => void;
}

const ConfigureMedic = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useAuth();

  if (user.configured) {
    history.replace("/configuracoes");
  }

  let pages: Array<JSX.Element> = [
    <Landing previousPage={previousPage} nextPage={nextPage} />,
    <AppointmentInfo previousPage={previousPage} nextPage={nextPage} />,
    <MedicSchedule nextPage={nextPage} previousPage={previousPage}/>,
    <ClinicAddress previousPage={previousPage} nextPage={nextPage} />,
    <ProfileConfig previousPage={previousPage} nextPage={nextPage}/>,
    <BankData previousPage={previousPage} nextPage={nextPage} />,
    <Success />,
  ];

  function previousPage() {
    if (currentPage === 0) {
      history.goBack();
    }

    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage + 1 < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="configure-medic">
      <ShareMedicConfigureFormProvider>
        {pages[currentPage]}
      </ShareMedicConfigureFormProvider>
    </div>
  );
};

export default ConfigureMedic;
