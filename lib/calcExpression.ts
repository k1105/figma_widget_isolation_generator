export const calcExpression: (str: string) => string = (str: string) => {
  if (Number(str)) {
    return str;
  }

  if (Number(str.split("*")[0])) {
    //一番最初に評価された式が掛け算だった場合
    const multiExpression = (
      str.match(/[0-9]+\*[0-9]+/g) as RegExpMatchArray
    )[0];
    const nums = multiExpression.split("*");
    const res = Number(nums[0]) * Number(nums[1]);
    return calcExpression(str.replace(multiExpression, String(res)));
  } else {
    //一番最初に評価された式が割り算だった場合
    const divExpression = (str.match(/[0-9]+\/[0-9]+/g) as RegExpMatchArray)[0];
    const nums = divExpression.split("/");
    const res = Number(nums[0]) / Number(nums[1]);
    return calcExpression(str.replace(divExpression, String(res)));
  }
};
