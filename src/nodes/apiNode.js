// apiNode.js
// Example node demonstrating API call functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const ApiNode = ({ id, data }) => {
  const [apiUrl, setApiUrl] = useState(data?.apiUrl || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');
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
    <BaseNode title="API" badge="HTTP" description="Configures a request to an external service." handles={handles} variant="api" onDelete={data?.onDelete}>
      <NodeField label="Method">
        <select className="node-control" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input 
          className="node-control"
          type="text" 
          value={apiUrl} 
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </NodeField>
    </BaseNode>
  );
}
