// mathNode.js
// Example node demonstrating mathematical operations

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-valueA`,
      style: { top: '30%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-valueB`,
      style: { top: '70%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
    },
  ];

  return (
    <BaseNode title="Math" badge="CALC" description="Applies arithmetic to incoming values." handles={handles} variant="math" onDelete={data?.onDelete}>
      <NodeField label="Operation">
        <select 
          className="node-control"
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
          <option value="power">Power</option>
          <option value="modulo">Modulo</option>
        </select>
      </NodeField>
    </BaseNode>
  );
}
