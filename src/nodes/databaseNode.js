// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

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
    <BaseNode title="Database" badge="DATA" description="Targets a storage engine or query surface." handles={handles} variant="database" onDelete={data?.onDelete}>
      <NodeField label="Type">
        <select className="node-control" value={dbType} onChange={(e) => setDbType(e.target.value)}>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="SQLite">SQLite</option>
        </select>
      </NodeField>
      <NodeField label="Table">
        <input 
          className="node-control"
          type="text" 
          value={table} 
          onChange={(e) => setTable(e.target.value)}
          placeholder="Table name"
        />
      </NodeField>
    </BaseNode>
  );
}
