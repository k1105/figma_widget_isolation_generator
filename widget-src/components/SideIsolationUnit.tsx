const { widget } = figma;
const { Rectangle, Frame } = widget;

export function SideIsolationUnit(props: Partial<FrameProps>) {
  return (
    <Frame
      name="SideIsolationUnit"
      overflow="visible"
      width={55.526}
      height={202.274}
      {...props}
    >
      <Rectangle
        name="SideIsolationUnit"
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
        height={202.274}
      />
    </Frame>
  );
}
