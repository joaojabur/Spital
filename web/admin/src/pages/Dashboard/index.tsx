import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardStatistics from "../../components/DashboardStatistics";
import Header from "../../components/Header";
import "./styles.css";

const Dashboard = () => {
  return (
    <div className="main">
      <Header />
      <div className="dashboard">
        <DashboardHeader />
        <DashboardStatistics />
      </div>
    </div>
  );
};

export default Dashboard;
