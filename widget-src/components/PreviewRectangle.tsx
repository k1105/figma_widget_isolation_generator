const { widget } = figma;
const { Rectangle, Frame } = widget;

import { IsolationUnit } from "./IsolationUnit";
import { SideIsolationUnit } from "./SideIsolationUnit";
import { BottomIsolationUnit } from "./BottomIsolationUnit";

type Props = {
  width: number;
  height: number;
  unitSize: number;
  multiply: number;
};

export function PreviewRectangle({ width, height, unitSize, multiply }: Props) {
  return (
    <Frame
      name="Group"
      strokeWidth={0}
      overflow="visible"
      width={422}
      height={313.327}
    >
      <Rectangle
        name="BoundingBox"
        x={unitSize * multiply}
        y={unitSize * multiply}
        stroke="#000"
        strokeAlign="center"
        width={width}
        height={height}
      />
      <IsolationUnit width={unitSize * multiply} height={unitSize * multiply} />
      <IsolationUnit
        name="IsolationUnit"
        x={width + unitSize * multiply}
        width={unitSize * multiply}
        height={unitSize * multiply}
      />
      <IsolationUnit
        name="IsolationUnit"
        y={height + unitSize * multiply}
        width={unitSize * multiply}
        height={unitSize * multiply}
      />
      <IsolationUnit
        name="IsolationUnit"
        x={width + unitSize * multiply}
        y={height + unitSize * multiply}
        width={unitSize * multiply}
        height={unitSize * multiply}
      />
      <SideIsolationUnit
        name="SideIsolationUnit"
        y={unitSize * multiply}
        width={unitSize * multiply}
        height={height}
      />
      <SideIsolationUnit
        name="SideIsolationUnit"
        x={width + unitSize * multiply}
        y={unitSize * multiply}
        width={unitSize * multiply}
        height={height}
      />
      <BottomIsolationUnit
        name="BottomIsolationUnit"
        x={unitSize * multiply}
        y={height + unitSize * multiply}
        width={width}
        height={unitSize * multiply}
      />
      <BottomIsolationUnit
        name="BottomIsolationUnit"
        x={unitSize * multiply}
        width={width}
        height={unitSize * multiply}
      />
    </Frame>
  );
}
