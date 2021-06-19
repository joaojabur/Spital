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
import { useHistory } from "react-router-dom";

interface Appointment {
  id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  isAllDay: boolean;
}

const AgendaComponent = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<Array<Appointment>>([]);

  useEffect(() => {
    setLoading(true);
    api.get(`appointments?medicID=${user.id}`).then((response: any) => {
      console.log(response);
      for (var i = 0; i <= response.data.lenght; i++) {
        // SetState Appointments
      }
      setLoading(false);
    });
  }, [user]);

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <>
      <div className="agenda">
        <HorizontalHeader title="Agenda" />
        <VerticalHeader colorIcon="agenda" />
        <div className="content">
          <ScheduleComponent
            eventSettings={{ dataSource: appointments }}
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
