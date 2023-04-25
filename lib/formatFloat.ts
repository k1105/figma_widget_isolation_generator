export const formatFloat = (val: number, digit: number) => {
  return Math.floor(val * 10 ** digit) / 10 ** digit;
};
