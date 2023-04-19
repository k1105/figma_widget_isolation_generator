const { widget } = figma;
const { Rectangle, Frame } = widget;

export function BottomIsolationUnit(props: Partial<FrameProps>) {
  return (
    <Frame
      name="BottomIsolationUnit"
      overflow="visible"
      width={310.947}
      height={55.526}
      {...props}
    >
      <Rectangle
        name="BottomIsolationUnit"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 0,
          bottomOffsetPercent: 0,
        }}
        stroke="#000"
        strokeAlign="center"
        width={310.947}
        height={55.526}
      />
    </Frame>
  );
}
