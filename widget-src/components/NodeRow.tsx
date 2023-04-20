const { widget } = figma;
const { Rectangle, AutoLayout, Text } = widget;

type Props = {
  active: boolean;
  setActiveNodeIndex: (
    newValue: number | ((currValue: number) => number)
  ) => void;
  index: number;
  width: number;
  height: number;
  name: string;
};

export function NodeRow({
  active,
  setActiveNodeIndex,
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
    </AutoLayout>
  );
}
