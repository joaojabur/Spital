import React from "react";
import "./styles.css";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { IoBasketOutline } from "react-icons/io5";
import ReactApexChart from "react-apexcharts";
import Column from "../Column";

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
          <div data-aos="flip-up" className="numbers-wrap">
            <RiHandbagLine color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>1.995</h2>
              <h4>Total de consultas</h4>
            </div>
          </div>
          <div data-aos="flip-up" className="numbers-wrap">
            <AiOutlineEye color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>2.110</h2>
              <h4>Visitas diárias</h4>
            </div>
          </div>
          <div data-aos="flip-up" className="numbers-wrap">
            <MdAttachMoney color="#333" size="5rem" />
            <div className="numbers-wrap-data">
              <h2>R$ 200.110</h2>
              <h4>Faturamento</h4>
            </div>
          </div>
          <div data-aos="flip-up" className="numbers-wrap">
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
        <div className="pattern clients">
          <h2>Melhores médicos</h2>
          <div className="clients-content">
            <Column title="ID" data={["1", "2", "3", "4", "5"]} />
            <Column
              title="Consultas"
              data={["400", "200", "900", "660", "1000"]}
            />
            <Column
              title="Avaliação"
              data={["5.0", "4.9", "5.0", "4.8", "4.7"]}
            />
          </div>
        </div>
        <div className="pattern orders">
          <h2>Últimos pedidos</h2>
          <div className="orders-content">
            <Column title="ID" data={["1", "2", "3", "4", "5"]} />
            <Column title="Preço" data={["300", "200", "400", "500", "1000"]} />
            <Column
              title="Nome"
              data={["João", "Marcos", "Márcio", "Carlos", "Jonny"]}
            />
            <Column
              title="Sobrenome"
              data={["Jabur", "Ferreira", "Gomes", "Michael", "Souza"]}
            />
            <Column
              title="Data"
              data={[
                "2021-10-17",
                "2021-05-30",
                "2021-06-30",
                "2021-07-25",
                "2021-10-27",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
