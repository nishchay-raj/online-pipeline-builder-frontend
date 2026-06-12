// databaseNode.js
// Example node demonstrating database query functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [table, setTable] = useState(data?.table || 'users');
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');

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
    <BaseNode title="Database" handles={handles}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Type:
          <select value={dbType} onChange={(e) => setDbType(e.target.value)}>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
            <option value="MongoDB">MongoDB</option>
            <option value="SQLite">SQLite</option>
          </select>
        </label>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '11px' }}>
          Table:
          <input 
            type="text" 
            value={table} 
            onChange={(e) => setTable(e.target.value)}
            placeholder="Table name"
            style={{ fontSize: '11px', width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
