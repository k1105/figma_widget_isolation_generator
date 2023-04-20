export const getScaleToFitContainer = (
  boxes: { width: number; height: number }[],
  container: { width: number; height: number }
) => {
  //扱いやすい形式に変換
  const width_list: number[] = []; //横幅だけが入ったリスト
  const height_list: number[] = []; //高さだけが入ったリスト
  for (const box of boxes) {
    width_list.push(box.width);
    height_list.push(box.height);
  }

  const maxWidth = Math.max(...width_list);
  const maxHeight = Math.max(...height_list);
  const scale = Math.min(
    container.width / maxWidth,
    container.height / maxHeight
  );

  return scale;
};
