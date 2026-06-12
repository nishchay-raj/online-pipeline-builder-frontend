// apiNode.js
// Example node demonstrating API call functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

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
    <BaseNode title="API" handles={handles}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '11px' }}>
          URL:
          <input 
            type="text" 
            value={apiUrl} 
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://api.example.com"
            style={{ fontSize: '11px', width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
