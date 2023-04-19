const { widget } = figma;
const { AutoLayout, Text, Rectangle, Frame, useSyncedState, Input } = widget;

import { IsolationUnit } from "./IsolationUnit";
import { SideIsolationUnit } from "./SideIsolationUnit";
import { BottomIsolationUnit } from "./BottomIsolationUnit";

type NodeProperty = {
  id: string;
  name: string;
  boundingBox: { width: number; height: number };
};

type Props = {
  masterNode: NodeProperty;
  activeNode: NodeProperty;
};

export function PreviewPanel({ masterNode, activeNode }: Props) {
  const [isolationUnitSize, setIsolationUnitSize] = useSyncedState<string>(
    "isolationUnitSize",
    "0"
  ); //width, heightなどの独自変数を使用する都合上、numberではなくstringを使用して後処理でstringに変換する
  return (
    <AutoLayout
      name="PreviewPanel"
      fill="#FFF"
      direction="vertical"
      spacing={5}
    >
      <AutoLayout name="Frame 12" fill="#FFF" direction="vertical" spacing={5}>
        <Text
          name="Preview"
          fill="#000"
          width={149}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          Preview
        </Text>
        <AutoLayout
          name="PreviewContainer"
          fill="#FFF"
          direction="vertical"
          spacing={10}
          padding={{
            vertical: 28,
            horizontal: 30,
          }}
          width={500}
          height={400}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <Frame
            name="Group"
            strokeWidth={0}
            overflow="visible"
            width={422}
            height={313.327}
          >
            <Rectangle
              name="BoundingBox"
              x={55.526}
              y={55.526}
              stroke="#000"
              strokeAlign="center"
              width={310.947}
              height={202.274}
            />
            <Frame
              name="IsolationUnit"
              overflow="visible"
              width={55.526}
              height={55.526}
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
            <IsolationUnit name="IsolationUnit" x={366.474} />
            <IsolationUnit name="IsolationUnit" y={257.801} />
            <IsolationUnit name="IsolationUnit" x={366.474} y={257.801} />
            <Frame
              name="SideIsolationUnit"
              y={55.526}
              overflow="visible"
              width={55.526}
              height={202.274}
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
            <SideIsolationUnit
              name="SideIsolationUnit"
              x={366.474}
              y={55.526}
            />
            <Frame
              name="BottomIsolationUnit"
              x={55.526}
              y={257.801}
              overflow="visible"
              width={310.947}
              height={55.526}
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
            <BottomIsolationUnit name="BottomIsolationUnit" x={55.526} />
          </Frame>
        </AutoLayout>
        <Text
          name="size"
          fill="#000"
          width={149}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={12}
        >
          {activeNode.boundingBox.width} x {activeNode.boundingBox.height} (px)
        </Text>
      </AutoLayout>
      <AutoLayout name="IsolationEditor" fill="#FFF" spacing={20}>
        <Text
          name="label"
          fill="#000"
          width={96}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          isolation:{" "}
        </Text>
        <Input
          name="value"
          value={isolationUnitSize}
          placeholder="isolation size"
          fill="#000"
          width={96}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
          onTextEditEnd={(e) => {
            setIsolationUnitSize(e.characters);
          }}
        />
        <Text
          name="px"
          fill="#000"
          width={45}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          (px)
        </Text>
      </AutoLayout>
      <Text
        name="MasterInformaiton"
        fill="#000"
        width={335}
        height={44}
        verticalAlignText="center"
        fontFamily="Inter"
        fontSize={18}
      >
        master: {masterNode.boundingBox.width} x {masterNode.boundingBox.height}{" "}
        (px)
      </Text>
      <AutoLayout
        name="Frame 14"
        fill="#FFF"
        stroke="#000"
        spacing={10}
        padding={{
          vertical: 20,
          horizontal: 167,
        }}
        width="fill-parent"
        horizontalAlignItems="center"
        verticalAlignItems="center"
      >
        <Text
          name="Generate Isolation"
          fill="#000"
          verticalAlignText="center"
          horizontalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
        >
          Generate Isolation
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
