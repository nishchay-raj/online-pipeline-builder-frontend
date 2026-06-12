// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode title="Output" badge="SINK" description="Delivers the result of the workflow." handles={handles} variant="output" onDelete={data?.onDelete}>
      <NodeField label="Name">
        <input 
          className="node-control"
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
        />
      </NodeField>
      <NodeField label="Type">
        <select className="node-control" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
}
