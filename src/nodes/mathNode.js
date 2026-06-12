// mathNode.js
// Example node demonstrating mathematical operations

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

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
    <BaseNode title="Math" handles={handles}>
      <label style={{ display: 'block' }}>
        Op:
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
          <option value="power">Power</option>
          <option value="modulo">Modulo</option>
        </select>
      </label>
    </BaseNode>
  );
}
