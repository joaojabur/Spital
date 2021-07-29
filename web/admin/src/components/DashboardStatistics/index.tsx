import React from "react";
import "./styles.css";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { IoBasketOutline } from "react-icons/io5";
import ReactApexChart from "react-apexcharts";

const DashboardStatistics = () => {
  const series = [
    {
      data: [1, 2, 3],
    },
  ];
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };

  return (
    <div className="dashboard-statistics">
      <h1>Dashboard</h1>
      <div className="dashboard-statistics-content">
        <div className="pattern numbers">
          <div className="numbers-wrap">
            <RiHandbagLine color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>1.995</h2>
              <h4>Total de consultas</h4>
            </div>
          </div>
          <div className="numbers-wrap">
            <AiOutlineEye color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>2.110</h2>
              <h4>Visitas diárias</h4>
            </div>
          </div>
          <div className="numbers-wrap">
            <MdAttachMoney color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>R$ 200.110</h2>
              <h4>Faturamento</h4>
            </div>
          </div>
          <div className="numbers-wrap">
            <IoBasketOutline color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>1.715</h2>
              <h4>Total de pedidos</h4>
            </div>
          </div>
        </div>
        <div className="pattern chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
        <div className="pattern clients"></div>
        <div className="pattern orders"></div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
