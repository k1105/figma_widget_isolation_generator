const { widget } = figma;
const { AutoLayout, Text } = widget;

type NodeProperty = {
  id: string;
  name: string;
  boundingBox: { width: number; height: number };
  isolationScale: number;
};

type Props = {
  registeredNodes: NodeProperty[];
  isolationUnitSize: number;
};

export function GenerateButton({ registeredNodes, isolationUnitSize }: Props) {
  return (
    <AutoLayout
      onClick={() => {
        for (const registeredNode of registeredNodes) {
          const node = figma.getNodeById(registeredNode.id) as SceneNode;
          const unitSize = isolationUnitSize * registeredNode.isolationScale;
          for (let i = 0; i < 4; i++) {
            const rect = figma.createRectangle();
            if (i < 2) {
              rect.y = node.y - unitSize;
            } else {
              rect.y = node.y + node.height;
            }

            if (i % 2 == 1) {
              rect.x = node.x - unitSize;
            } else {
              rect.x = node.x + node.width;
            }

            rect.resize(unitSize, unitSize);
            //現状はfillの透明度を0にしているが, fillsをそもそも存在させない方法がないか？
            rect.fills = [
              { type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0 },
            ];
            rect.strokes = [
              { type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } },
            ];
            figma.currentPage.appendChild(rect);
          }
        }
      }}
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
  );
}
