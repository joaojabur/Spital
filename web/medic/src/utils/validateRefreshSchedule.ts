import { RefreshSchedule } from "../platform-pages/ConfigurationsMedicSchedule";

export default function refreshScheduleValidate(credentials: RefreshSchedule) {
  let errors = {} as RefreshSchedule;

  if (credentials !== null) {
    if (!credentials?.from?.length ?? 0) {
      errors.from = "Campo de horário é necessário.";
    } else if (credentials?.from?.length !== 5) {
      errors.from = "Campo de horário é incorreto";
    }

    if (!credentials?.to?.length ?? 0) {
      errors.to = "Campo de horário é necessário.";
    } else if (credentials?.to?.length !== 5) {
      errors.to = "Campo de horário é incorreto";
    }
  }

  return errors;
}
