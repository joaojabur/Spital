import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

const HomeClient = () => {
  const { loggedUser } = useContext(DataContext);

  return <div>{loggedUser.firstName}</div>;
};

export default HomeClient;
