// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode title="Input" badge="SOURCE" description="Starts a flow with structured data." handles={handles} variant="input" onDelete={data?.onDelete}>
      <NodeField label="Name">
        <input 
          className="node-control"
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
        />
      </NodeField>
      <NodeField label="Type">
        <select className="node-control" value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
}
