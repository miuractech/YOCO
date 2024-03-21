/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { INodeType } from './types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { ProjectNode } from './projectNode';
// import { Text, Title } from '@mantine/core';
import { BranchNode } from './branchNode';
type Props = {
  blocks: INodeType[];
};

export default function Nodes({ blocks }: Props) {
  const nodeTypes = useMemo(
    () => ({ basenode: BranchNode, projectnode: ProjectNode }),
    []
  );
  //   const flattendNodes = flattenNodes(node);
  //   const [edges, setEdges, onEdgesChange] = useEdgesState(
  //     buildEdgesFromNode(node)
  //   );
  const [nodes, setNodes, onNodesChange] = useNodesState<INodeType>([]);
  useEffect(() => {
    if (blocks)
      setNodes(
        blocks.map((t) => ({
          type: t.id === 'root' ? 'projectnode' : 'basenode',
          ...t,
          data:t,
        }))
      );
  }, [blocks]);
  const stageRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  //   const onConnect = useCallback(
  //     (params: Connection) =>
  //       setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
  //     [setEdges]
  //   );
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 5,
        y: event.clientY - 5,
      });
      const newNode: Node = {
        id: `dndnode_${v4()}`,
        type: 'project',
        position,
        data: { label: 'tets' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div ref={stageRef} className="h-screen w-screen">
      <ReactFlow
        className="h-screen w-screen"
        nodes={nodes}
        // edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={console.log}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
