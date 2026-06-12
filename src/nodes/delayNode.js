// delayNode.js
// Example node demonstrating delay/wait functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

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
    <BaseNode title="Delay" badge="WAIT" description="Pauses execution for a fixed duration." handles={handles} variant="delay" onDelete={data?.onDelete}>
      <NodeField label="Delay (ms)">
        <input 
          className="node-control"
          type="number" 
          value={delayMs} 
          onChange={(e) => setDelayMs(parseInt(e.target.value))}
          min="0"
          step="100"
        />
      </NodeField>
    </BaseNode>
  );
}
