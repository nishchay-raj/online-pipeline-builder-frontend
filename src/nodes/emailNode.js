// emailNode.js
// Example node demonstrating email sending functionality

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

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
    <BaseNode title="Email" handles={handles}>
      <div>
        <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px' }}>
          To:
          <input 
            type="text" 
            value={recipient} 
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="user@example.com"
            style={{ fontSize: '11px', width: '100%' }}
          />
        </label>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '11px' }}>
          Subject:
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            style={{ fontSize: '11px', width: '100%' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
