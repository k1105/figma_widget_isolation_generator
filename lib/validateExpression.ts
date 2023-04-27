export const validateExpression = (str: string) => {
  if (!str.match(/[^0-9\.\*\/]/g)) {
    if (!str.split("*").includes("") && !str.split("/").includes("")) {
      return true;
    }
  }
  return false;
};
