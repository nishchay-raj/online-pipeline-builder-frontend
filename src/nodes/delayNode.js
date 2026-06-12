// delayNode.js
// Example node demonstrating delay/wait functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode title="Delay" handles={handles}>
      <label style={{ display: 'block' }}>
        Delay (ms):
        <input 
          type="number" 
          value={delayMs} 
          onChange={(e) => setDelayMs(parseInt(e.target.value))}
          min="0"
          step="100"
          style={{ width: '100%' }}
        />
      </label>
    </BaseNode>
  );
}
