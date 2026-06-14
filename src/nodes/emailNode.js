// emailNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || 'user@example.com');
  const [subject, setSubject] = useState(data?.subject || 'Subject');

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
    <BaseNode title="Email" badge="MAIL" description="Prepares a message for delivery." handles={handles} variant="email" onDelete={data?.onDelete}>
      <NodeField label="To">
        <input 
          className="node-control"
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="user@example.com"
        />
      </NodeField>
      <NodeField label="Subject">
        <input 
          className="node-control"
          type="text" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
      </NodeField>
    </BaseNode>
  );
}
