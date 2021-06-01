import React, { useState } from "react";
import MainProfileMedic from "../../components/MedicProfilePages/Main";
import PaymentMedicProfile from "../../components/MedicProfilePages/Payment";
import ScheduleMedicProfile from "../../components/MedicProfilePages/Schedule";
import ShareAppointmentFormProvider from "../../context/ShareAppointmentFormProvider";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FinalizePayment from "../../components/MedicProfilePages/FinalizePayment";

const stripeTestPromise = loadStripe(
  "pk_test_51Iv07nLzHamxFkPlOXUPzNy3nYzwfpzIsELp6DbiThm491PCIQX5o7D0w3I1uhnj1fyF8P3VTMq3vkMuIqvjBtit008Uk9KvJj"
);

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
      <Elements stripe={stripeTestPromise}>{pages[currentPage]}</Elements>
    </ShareAppointmentFormProvider>
  );
};

export default MedicProfile;
