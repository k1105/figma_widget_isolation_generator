const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text } = widget;

import { NodeRow } from "./components/NodeRow";
import { getScaleToFitContainer } from "../lib/getScaleToFitContainer";
import { PreviewPanel } from "./components/PreviewPanel";

type NodeProperty = {
  id: string;
  name: string;
  boundingBox: { width: number; height: number };
  isolationScale: number;
};

function IsolationManager() {
  const [registeredNodes, setRegisteredNodes] = useSyncedState<NodeProperty[]>(
    "registeredNode",
    []
  );
  const [activeNodeIndex, setActiveNodeIndex] = useSyncedState<number>(
    "activeNodeIndex",
    0
  );
  const [masterNodeIndex, setMasterNodeIndex] = useSyncedState<number>(
    "masterNodeIndex",
    0
  );
  const [listBoxScale, setListBoxScale] = useSyncedState<number>(
    "listBoxScale",
    1
  );

  const [masterOptions, setMasterOptions] = useSyncedState<
    { option: string; label: string }[]
  >("masterOptions", []);

  if (masterOptions.length > 0) {
    usePropertyMenu(
      [
        {
          itemType: "action",
          tooltip: "Set master",
          propertyName: "Label",
        },
        {
          itemType: "dropdown",
          propertyName: "SetMaster",
          tooltip: "Font selector",
          selectedOption: masterOptions[masterNodeIndex].option,
          options: masterOptions,
        },
      ],
      ({ propertyName, propertyValue }) => {
        if (propertyName === "SetMaster") {
          console.log(propertyValue);
          setMasterNodeIndex(Number(propertyValue));
        }
      }
    );
  }

  return (
    <AutoLayout name="IsolationManager" fill="#FFF" spacing={30} padding={30}>
      {registeredNodes.length == 0 ? (
        <>
          <AutoLayout
            name="Frame13"
            fill="#000"
            cornerRadius={10}
            direction="vertical"
            padding={10}
            horizontalAlignItems="end"
            onClick={() => {
              const selectedNodes = figma.currentPage.selection.concat(); //複製
              console.log(selectedNodes);
              const nodes: NodeProperty[] = [];
              const originalBoundingBoxes: { width: number; height: number }[] =
                [];
              for (const node of selectedNodes) {
                originalBoundingBoxes.push({
                  width: node.width,
                  height: node.height,
                });
              }
              const scale = getScaleToFitContainer(originalBoundingBoxes, {
                width: 140,
                height: 115,
              });
              setListBoxScale(scale);
              for (const node of selectedNodes) {
                nodes.push({
                  id: node.id,
                  name: node.name,
                  boundingBox: {
                    width: node.width,
                    height: node.height,
                  },
                  isolationScale: 1,
                });
              }
              setRegisteredNodes(nodes);

              const options: { option: string; label: string }[] = [];
              nodes.forEach((node, index) => {
                options.push({ option: String(index), label: node.name });
              });
              setMasterOptions(options);
            }}
          >
            <Text
              name="Load Selected Nodes"
              fill="#FFF"
              width={183}
              height={31}
              verticalAlignText="center"
              horizontalAlignText="right"
              fontFamily="Inter"
              fontSize={18}
            >
              Load Selected Nodes
            </Text>
          </AutoLayout>
        </>
      ) : (
        <PreviewPanel
          masterNodeIndex={masterNodeIndex}
          activeNodeIndex={activeNodeIndex}
          registeredNodes={registeredNodes}
          setRegisteredNodes={setRegisteredNodes}
        />
      )}

      {registeredNodes.length == 0 ? (
        <></>
      ) : (
        <AutoLayout
          name="RegisteredNodesContainer"
          fill="#FFF"
          direction="vertical"
        >
          {(() => {
            const rows: any[] = [];
            registeredNodes.forEach((node, index) => {
              let row = <></>;
              row = (
                <NodeRow
                  active={activeNodeIndex == index ? true : false}
                  setActiveNodeIndex={setActiveNodeIndex}
                  index={index}
                  width={node.boundingBox.width * listBoxScale}
                  height={node.boundingBox.height * listBoxScale}
                  name={node.name}
                  key={index}
                />
              );
              rows.push(row);
            });
            return rows;
          })()}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(IsolationManager);
