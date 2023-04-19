const { widget } = figma;
const { Rectangle, Frame, AutoLayout, Text, Ellipse } = widget;

type Props = {
  active: boolean;
  master: boolean;
  setActiveNodeIndex: (
    newValue: number | ((currValue: number) => number)
  ) => void;
  setMasterNodeIndex: (
    newValue: number | ((currValue: number) => number)
  ) => void;
  index: number;
  width: number;
  height: number;
  name: string;
};

export function NodeRow({
  active,
  master,
  setActiveNodeIndex,
  setMasterNodeIndex,
  index,
  width,
  height,
  name,
}: Props) {
  return (
    <AutoLayout
      name="NodeRow"
      fill={active ? "#ECECEC" : "#FFF"}
      spacing={30}
      padding={{
        vertical: 0,
        horizontal: 30,
      }}
      height={120}
      verticalAlignItems="center"
      onClick={() => {
        setActiveNodeIndex(index);
      }}
    >
      <AutoLayout
        name="BoundingBoxContainer"
        direction="vertical"
        spacing={10}
        padding={{
          vertical: 27,
          horizontal: 0,
        }}
        width={140}
        height="fill-parent"
        verticalAlignItems="center"
        horizontalAlignItems="center"
      >
        <Rectangle
          name="Rectangle 48"
          stroke="#000"
          width={width}
          height={height}
        />
      </AutoLayout>
      <Text
        name="Name"
        fill="#000"
        width={300}
        height={62}
        verticalAlignText="center"
        fontFamily="Inter"
        fontSize={18}
      >
        {name}
      </Text>
      <Frame
        name="RadioButton"
        strokeWidth={0}
        overflow="visible"
        width={24}
        height={24}
        onClick={() => setMasterNodeIndex(index)}
      >
        <Ellipse name="Ellipse 1" fill="#D9D9D9" width={24} height={24} />
        <Ellipse
          name="Ellipse 2"
          x={4}
          y={4}
          fill={master ? "#0B8BEE" : "#D9D9D9"}
          width={16}
          height={16}
        />
      </Frame>
      <AutoLayout name="IterationInput" height={30}>
        <Text
          name="x"
          fill="#000"
          width={14}
          height={30}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          x
        </Text>
        <Text
          name="2"
          fill="#000"
          width={30}
          height={30}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          2
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
