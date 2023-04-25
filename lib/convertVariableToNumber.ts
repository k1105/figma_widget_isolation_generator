export const convertVariableToNumber = (
  str: string,
  width: number,
  height: number
) => {
  return str
    .replace(/width/g, String(width))
    .replace(/height/g, String(height));
};
