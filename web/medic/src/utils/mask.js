function mask(value, pattern) {
  let i = 0;
  const v = value.toString().replace(/[^a-zA-Z0-9]/g, "");
  return pattern.replace(/#/g, () => v[i++] || "");
}

export default mask;
