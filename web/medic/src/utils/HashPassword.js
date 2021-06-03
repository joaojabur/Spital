function getPasswordAsterisk(password) {
  const asteriskPassword = password.replace(/./g, "*");
  return asteriskPassword;
}

export default getPasswordAsterisk;
