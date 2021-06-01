import { useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import AppointmentUniqueMain from "../../components/AppointmentUniquePages/Main";
import AppointmentUniqueReview from "../../components/AppointmentUniquePages/Review";

const AppointmentUnique = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);

  let pages: Array<JSX.Element> = [
    <AppointmentUniqueMain previousPage={previousPage} nextPage={nextPage} />,
    <AppointmentUniqueReview previousPage={previousPage} nextPage={nextPage} />,
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
  return <>{pages[currentPage]}</>;
};

export default AppointmentUnique;
