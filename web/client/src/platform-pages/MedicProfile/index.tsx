import { useState } from "react";
import MainProfileMedic from "../../components/MedicProfilePages/Main";
import PaymentMedicProfile from "../../components/MedicProfilePages/Payment";
import ScheduleMedicProfile from "../../components/MedicProfilePages/Schedule";
import ShareAppointmentFormProvider from "../../context/ShareAppointmentFormProvider";
import { useHistory } from "react-router-dom";
import FinalizePayment from "../../components/MedicProfilePages/FinalizePayment";

const MedicProfile = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);

  let pages: Array<JSX.Element> = [
    <MainProfileMedic nextPage={nextPage} previousPage={previousPage} />,
    <ScheduleMedicProfile nextPage={nextPage} previousPage={previousPage} />,
    <PaymentMedicProfile nextPage={nextPage} previousPage={previousPage} />,
    <FinalizePayment previousPage={previousPage} />,
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
    <ShareAppointmentFormProvider>
      {pages[currentPage]}
    </ShareAppointmentFormProvider>
  );
};

export default MedicProfile;
