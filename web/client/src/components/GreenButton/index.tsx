import "./styles.css";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";

interface GreenButtonInterface {
  label: string;
  getMonth: () => number;
  year: string;
  monthDay: string;
  nextPage: () => void;
}

const GreenButton = ({
  label,
  getMonth,
  year,
  monthDay,
  nextPage,
}: GreenButtonInterface) => {
  const { appointmentData, setAppointmentData, error, setError } =
    useShareAppointmentForm();

  const month = getMonth();

  function calculateMonth(month: any) {
    switch (month) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;

      default:
        return 0;
    }
  }

  const totalDate =
    Number(monthDay) * 10000 +
    Number(month) * 100000 * (Number(year) * 1000000);

  const today = new Date();
  const todayString = today.toString();
  const [today_week_day, today_month, today_month_day, today_year, today_time] =
    todayString.split(" ");
  let [now_hour, now_minute] = today_time.split(":");

  if (now_minute?.length === 1) {
    now_minute = now_minute + "0";
  }

  const stringNowMinuteHour = now_hour.concat(now_minute);

  const todayNumberMonth = calculateMonth(today_month);

  const now_totalDate =
    Number(today_month_day) * 10000 +
    todayNumberMonth * 100000 * (Number(today_year) * 1000000) +
    Number(stringNowMinuteHour);

  let hour = appointmentData?.time?.split(":")[0];
  let minute: any = appointmentData?.time?.split(":")[1];

  if (minute?.length === 1) {
    minute = minute + "0";
  }

  const stringMinuteHour = hour?.concat(minute);

  function verifyAppointmentData() {
    if (!appointmentData?.type || !appointmentData?.time) {
      setError("Consulta ou horário não selecionado(s)");
    } else if (now_totalDate > totalDate + Number(stringMinuteHour)) {
      setError("Não é possível viajar no tempo...");
    } else {
      setError("");
      setAppointmentData({
        ...appointmentData,
        date: `${monthDay}/${month}/${year}`,
      });
      nextPage();
    }
  }

  return (
    <>
      {error?.length === 0 ? (
        <span></span>
      ) : (
        <div className="error-container">
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={verifyAppointmentData}
        className="green-button"
        type="button"
      >
        {label}
      </button>
    </>
  );
};

export default GreenButton;
