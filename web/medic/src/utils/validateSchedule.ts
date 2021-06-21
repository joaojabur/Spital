interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

export default function validateSchedule(credentials: Array<Schedule>) {
  let errors = [
    { week_day: 1, from: "Problema", to: "Problemasso" },
  ] as Array<Schedule>;
  console.log(errors);

  for (var i = 0; i <= credentials.length; i++) {
    console.log(i);
  }

  return errors;
}
