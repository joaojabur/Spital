import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useModal } from "../../../context/ModalProvider";
import Overlay from "../Overlay";
import "./styles.css";
import Select from "react-select";

export interface FiltroProps {
  changePrice: (price: number) => void;
  changeDistance: (distance: number) => void;
  currentPrice: number;
  currentDistance: number;
}

const Filtro = ({
  changePrice,
  changeDistance,
  currentPrice,
  currentDistance,
}: FiltroProps) => {
  const { filter } = useModal();
  let [price, setPrice] = useState<number>(currentPrice);
  let [distance, setDistance] = useState<number>(currentDistance);

  const prices = [
    {
      label: "Até R$ 100",
      value: 100,
    },
    {
      label: "Até R$ 200",
      value: 200,
    },
    {
      label: "Até R$ 300",
      value: 300,
    },
    {
      label: "Até R$ 400",
      value: 400,
    },
    {
      label: "Até R$ 500",
      value: 500,
    },
  ];

  const distances = [
    {
      label: "Até 10km",
      value: 10,
    },
    {
      label: "Até 20km",
      value: 20,
    },
    {
      label: "Até 40km",
      value: 40,
    },
    {
      label: "Até 60km",
      value: 60,
    },
    {
      label: "Até 80km",
      value: 80,
    },
    {
      label: "Até 100km",
      value: 100,
    },
    {
      label: "Independente da distância",
      value: 9999,
    },
  ];

  function handleFilter() {
    changePrice(price);
    changeDistance(distance);

    filter.close();
  }

  return (
    <Overlay>
      <form className="filtro">
        <div onClick={filter.close} className="close-button">
          <IoCloseOutline size={"4rem"} color="#fff" />
        </div>
        <h1>Filtros</h1>
        <div className="filtro-select">
          <div className="filtro-select-unique">
            <p>Preços</p>
            <Select
              options={prices}
              defaultValue={{
                label: `Até R$ ${currentPrice}`,
                value: currentPrice,
              }}
              onChange={(e: any) => {
                setPrice(e.value);
              }}
            />
          </div>
          <div className="filtro-select-unique">
            <p>Distância</p>
            <Select
              options={distances}
              defaultValue={
                !currentDistance
                  ? distances[distances.length - 1]
                  : distances.filter(
                      (item) => item.value === currentDistance
                    )[0]
              }
              onChange={(e: any) => {
                setDistance(e.value);
              }}
            />
          </div>

          <button
            type="button"
            className="filtro-button"
            onClick={handleFilter}
          >
            Filtrar
          </button>
        </div>
      </form>
    </Overlay>
  );
};

export default Filtro;
