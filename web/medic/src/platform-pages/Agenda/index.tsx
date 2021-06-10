import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Inject,
  Day,
  Month,
  Week,
  Agenda,
  WorkWeek,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthProvider";
import { useModal } from "../../context/ModalProvider";

const AgendaComponent = () => {
  const { user } = useAuth();

  const [data, setData] = useState([
    {
      id: 1,
      Subject: "Consulta com João Jabur",
      StartTime: new Date(2021, 4, 17, 10, 0),
      EndTime: new Date(2021, 4, 17, 12, 30),
      isAllDay: false,
    },
    {
      id: 2,
      Subject: "Consulta com Marcos Amorim",
      StartTime: new Date(2021, 4, 21, 11, 0),
      EndTime: new Date(2021, 4, 21, 15, 30),
      isAllDay: false,
    },
  ]);

  return (
    <>
      <div className="agenda">
        <HorizontalHeader title="Agenda" />
        <VerticalHeader colorIcon="agenda" />
        <div className="content">
          <ScheduleComponent
            eventSettings={{ dataSource: data }}
            actionBegin={(e: any) => {
              console.log(e.data);
            }}
          >
            <Inject
              services={[
                Day,
                Week,
                WorkWeek,
                Month,
                Agenda,
                DragAndDrop,
                Resize,
              ]}
            />
          </ScheduleComponent>
        </div>
      </div>
    </>
  );
};

export default AgendaComponent;
