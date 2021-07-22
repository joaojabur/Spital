import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { AxisOptions, Chart } from "react-charts";
import { IoArrowUpOutline, IoPersonOutline } from "react-icons/io5";
import { HiOutlineCash } from "react-icons/hi";
import "./styles.css";

const Revenue = () => {
  const data = [
    {
      label: "Faturamento mensal",
      data: [
        {
          month: "Jan",
          value: 1000,
        },
        {
          month: "Feb",
          value: 2000,
        },
        {
          month: "Mar",
          value: 1500,
        },
        {
          month: "Apr",
          value: 5000,
        },
        {
          month: "May",
          value: 1000,
        },
        {
          month: "Jun",
          value: 7000,
        },
        {
          month: "Jul",
          value: 5000,
        },
        {
          month: "Aug",
          value: 11000,
        },
        {
          month: "Oct",
          value: 9000,
        },
        {
          month: "Nov",
          value: 5000,
        },
        {
          month: "Dec",
          value: 11000,
        },
      ],
    },
  ];

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.month,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );

  return (
    <div className="agenda">
      <HorizontalHeader title="Faturamento" />
      <VerticalHeader colorIcon="revenue" />
      <div className="content">
        <div className="revenue">
          <h1 className="title-revenue">FATURAMENTO</h1>
          <div className="revenue-flex">
            <div className="chart-div">
              <Chart options={{ data, primaryAxis, secondaryAxes }} />
            </div>
            <div className="info">
              <div className="date">
                <div className="date-picker"></div>
                <h2>R$ 549.735,00</h2>
                <p>
                  <IoArrowUpOutline color="#23ff01" size={30} />
                  <span>R$ 15.200,00</span>
                </p>
              </div>
              <div className="views">
                <h2>Visualizações diárias</h2>
                <p>329</p>
                <h2>Visualizações mensais</h2>
                <p>9.750</p>
              </div>
            </div>
          </div>
          <h1 className="title-revenue">CRESCIMENTO DE VISIBILIDADE</h1>
          <div
            style={{ justifyContent: "flex-start", flexDirection: "row" }}
            className="revenue-flex"
          >
            <div className="visibility">
              <div className="visibility-icon">
                <IoPersonOutline color="#07B3D6" size={40} />
              </div>
              <div className="visibility-text">
                <h2>Visitantes diários</h2>
                <p>
                  329,10
                  <span>
                    <IoArrowUpOutline color="#23ff01" size={12} /> 27%
                  </span>
                </p>
              </div>
            </div>
            <div style={{ marginLeft: "3rem" }} className="visibility">
              <div className="visibility-icon">
                <HiOutlineCash color="#07B3D6" size={40} />
              </div>
              <div className="visibility-text">
                <h2>Consultas diárias</h2>
                <p>
                  5,10
                  <span>
                    <IoArrowUpOutline color="#23ff01" size={12} /> 100%
                  </span>
                </p>
              </div>
            </div>
          </div>
          <h1 className="title-revenue">VALOR A SER SACADO</h1>
          <div
            style={{ justifyContent: "flex-start", flexDirection: "row" }}
            className="revenue-flex"
          >
            <h3>R$ 623.120,10</h3>
            <p>
              <IoArrowUpOutline style={{ marginTop: "2rem" }} color="#23ff01" size={30} />
              <span>27%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
