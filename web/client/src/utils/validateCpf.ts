interface validateCPFProps {
  cpf: string;
}

export default function validateCPF({ cpf }: validateCPFProps) {
  function getDigit(cpf: string) {
    let lastDigit = 0;

    for (let i = 0; i < cpf.length; i++) {
      lastDigit += parseInt(cpf[cpf.length - i - 1]) * (i + 2);
    }

    lastDigit = (lastDigit * 10) % 11;

    if (lastDigit === 10) {
      return 0;
    }

    return lastDigit;
  }

  if (cpf.length === 11) {
    let validatedCpf = cpf.substring(0, 9);

    validatedCpf += getDigit(validatedCpf);
    validatedCpf += getDigit(validatedCpf);

    if (cpf === validatedCpf) {
      return false;
    }
  }
  return true;
}
