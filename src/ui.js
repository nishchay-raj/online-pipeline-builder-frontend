// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { 
  InputNode, 
  OutputNode, 
  TextNode, 
  LLMNode,
  ApiNode,
  DatabaseNode,
  EmailNode,
  MathNode,
  DelayNode,
} from './nodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  text: TextNode,
  llm: LLMNode,
  api: ApiNode,
  database: DatabaseNode,
  email: EmailNode,
  math: MathNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ isDarkMode = false }) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      deleteNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: {
                ...getInitNodeData(nodeID, type),
                onDelete: () => deleteNode(nodeID),
              },
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode, deleteNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className="workflow-canvas">
            <ReactFlow
          className="workflow-flow"
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
                defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
            >
                <Background color={isDarkMode ? 'rgba(134, 163, 201, 0.22)' : 'rgba(94, 118, 153, 0.22)'} gap={gridSize} size={1} />
                <Controls className="workflow-flow__controls" />
                <MiniMap className="workflow-flow__minimap" maskColor={isDarkMode ? 'rgba(11, 18, 32, 0.62)' : 'rgba(255,255,255,0.65)'} />
            </ReactFlow>
        </div>
        </>
    )
}
