interface newPassword {
  password: string;
  confirmPassword: string;
}

export default function validateNewPassword(credentials: newPassword) {
  let errors = {} as newPassword;

  if (!credentials?.password && 0) {
    errors.password = "Campo de senha é necessário";
  } else if (!((credentials?.password?.length ?? 0) > 5)) {
    errors.password = "Senha muito pequena";
  }

  if (!credentials?.confirmPassword && 0) {
    errors.confirmPassword = "Campo de confirmação de senha é necessário";
  } else if (credentials?.confirmPassword !== credentials?.password) {
    errors.confirmPassword = "Campos não batem";
  }

  return errors;
}
