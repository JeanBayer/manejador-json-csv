export const isRutValid = (rutCompleto: string) => {
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;

  const [rut, digv] = rutCompleto.toLowerCase().split("-");
  const result = calculateDVRut(Number.parseInt(rut)).toString();
  console.log(result, digv);
  return result === digv;
};

const calculateDVRut = (T: number) => {
  let M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  }
  return S ? S - 1 : "k";
};
