const { widget } = figma;
const { Rectangle, Frame } = widget;

export function IsolationUnit(props: Partial<FrameProps>) {
  return (
    <Frame
      name="IsolationUnit"
      overflow="visible"
      width={55.526}
      height={55.526}
      {...props}
    >
      <Rectangle
        name="IsolationUnit"
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
        width={55.526}
        height={55.526}
      />
    </Frame>
  );
}
