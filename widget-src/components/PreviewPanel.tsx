const { widget } = figma;
const { AutoLayout, Text, Rectangle, Frame, useSyncedState, Input } = widget;

import { getScaleToFitContainer } from "../../lib/getScaleToFitContainer";
import { PreviewRectangle } from "./PreviewRectangle";

type NodeProperty = {
  id: string;
  name: string;
  boundingBox: { width: number; height: number };
  isolationScale: number;
};

type Props = {
  masterNodeIndex: number;
  activeNodeIndex: number;
  registeredNodes: NodeProperty[];
  setRegisteredNodes: (
    newValue: NodeProperty[] | ((currValue: NodeProperty[]) => NodeProperty[])
  ) => void;
};

export function PreviewPanel({
  masterNodeIndex,
  activeNodeIndex,
  registeredNodes,
  setRegisteredNodes,
}: Props) {
  const rectangleWidth = registeredNodes[activeNodeIndex].boundingBox.width;
  const rectangleHeight = registeredNodes[activeNodeIndex].boundingBox.height;
  const [isolationUnitSize, setIsolationUnitSize] = useSyncedState<string>(
    "isolationUnitSize",
    "100"
  ); //width, heightなどの独自変数を使用する都合上、numberではなくstringを使用して後処理でstringに変換する

  // previewBoxScaleの初期化処理
  const boxes: { width: number; height: number }[] = []; //isolationを含むボックスのサイズを格納するための空配列を定義
  for (let node of registeredNodes) {
    boxes.push({
      //isolationを含むボックスサイズ = 左右（または上下）に（単位長） * (isolationのスケール)
      width:
        node.boundingBox.width +
        2 * Number(isolationUnitSize) * node.isolationScale,
      height:
        node.boundingBox.height +
        2 * Number(isolationUnitSize) * node.isolationScale,
    });
  }
  const [scale, setScale] = useSyncedState<number>(
    "scale",
    getScaleToFitContainer(boxes, {
      width: 450,
      height: 350,
    })
  );

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
          <PreviewRectangle
            width={rectangleWidth * scale}
            height={rectangleHeight * scale}
            unitSize={Number(isolationUnitSize) * scale}
            multiply={registeredNodes[activeNodeIndex].isolationScale}
          />
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
          {registeredNodes[activeNodeIndex].boundingBox.width} x{" "}
          {registeredNodes[activeNodeIndex].boundingBox.height} (px)
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
          fill="#000"
          width={96}
          height={31}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
          onTextEditEnd={(e) => {
            setIsolationUnitSize(e.characters);
            const newIsolationUnitSize = Number(isolationUnitSize);
            const boxes: { width: number; height: number }[] = [];
            for (const node of registeredNodes) {
              boxes.push({
                width:
                  node.boundingBox.width +
                  2 * newIsolationUnitSize * node.isolationScale,
                height:
                  node.boundingBox.height +
                  2 * newIsolationUnitSize * node.isolationScale,
              });
            }
            const newScale = getScaleToFitContainer(boxes, {
              width: 450,
              height: 350,
            });
            setScale(newScale);
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
        <Input //isolationとして、単位長の何倍を指定するか、を設定するインプットフォーム
          name="number"
          fill="#000"
          width={30}
          height={30}
          verticalAlignText="center"
          fontFamily="Inter"
          fontSize={18}
          value={String(registeredNodes[activeNodeIndex].isolationScale)}
          onTextEditEnd={(e) => {
            // isolationScaleの更新処理
            const newNodes: NodeProperty[] = registeredNodes.concat();
            newNodes[activeNodeIndex].isolationScale = Number(e.characters);
            setRegisteredNodes(newNodes);
            const boxes: { width: number; height: number }[] = [];
            for (let node of newNodes) {
              boxes.push({
                width:
                  node.boundingBox.width +
                  2 * Number(isolationUnitSize) * node.isolationScale,
                height:
                  node.boundingBox.height +
                  2 * Number(isolationUnitSize) * node.isolationScale,
              });
            }
            const newScale = getScaleToFitContainer(boxes, {
              width: 450,
              height: 350,
            });
            setScale(newScale);
          }}
        />
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
        master: {registeredNodes[masterNodeIndex].boundingBox.width} x{" "}
        {registeredNodes[masterNodeIndex].boundingBox.height} (px)
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
