import { Edge } from 'reactflow';
import { INodeType } from './types';
import { ActionIcon, Card, Drawer, Modal } from '@mantine/core';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconPlus,
  IconWand,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
// interface nodeType {
//   id: string; // Matches the id from INodeType
//   position: {
//     x: number;
//     y: number;
//   };
//   data: {
//     label: React.ReactNode; // Specifies that label will be a JSX element
//   };
// }
// export function buildEdgesFromNode(
//   rootNode: INodeType,
//   edges: Edge[] = []
// ): Edge[] {
//   if (rootNode.children && rootNode.children.length > 0) {
//     rootNode.children.forEach((childNode) => {
//       // Create an edge from the current node to its child
//       const edge: Edge = {
//         id: `${rootNode.id}-${childNode.id}`,
//         source: rootNode.id,
//         target: childNode.id,
//         animated: true,
//       };
//       edges.push(edge);

//       // Recursively process the child node
//       buildEdgesFromNode(childNode, edges);
//     });
//   }

//   return edges;
// }
const nodeClass = 'flex gap-2 items-center justify-between';
export const DefaultNode = ({ node }: { node: INodeType }) => {
  const [opened, setOpened] = useState(false);
  const [fullScreen, handlers] = useDisclosure(false);
  return (
    <div className={nodeClass}>
      {node.title}
      <ActionIcon onClick={() => setOpened(true)} variant="outline" size="sm">
        <IconPlus />
      </ActionIcon>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        size={fullScreen ? '100%' : 'xl'}
      >
        <ActionIcon
          onClick={() => handlers.toggle()}
          variant="outline"
          size="sm"
        >
          {fullScreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
        </ActionIcon>
        {node.contents.map((content) => (
          <Card withBorder>
            <Card.Section>{content.title}</Card.Section>
            <Card.Section>{content.content}</Card.Section>
          </Card>
        ))}
      </Drawer>
    </div>
  );
};
// export const transformNodeToNodeType = (node: INodeType): nodeType => ({
//   id: node.id,
//   position: { y: node.position.y, x: node.position.x },
//   data: {
//     label: <DefaultNode node={node} />,
//   },
// });

// // Recursive function to iterate through INodeType and its childrens, if any
// export const flattenNodes = (node: INodeType, result: nodeType[] = []) => {
//   // Transform the current node and add to the result array
//   result.push(transformNodeToNodeType(node));

//   // If the node has children, iterate through them recursively
//   if (node.children && node.children.length > 0) {
//     node.children.forEach((childNode) => flattenNodes(childNode, result));
//   }

//   return result;
// };
