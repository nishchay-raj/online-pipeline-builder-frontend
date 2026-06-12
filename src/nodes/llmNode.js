// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode title="LLM" badge="AI" description="Routes prompts to a language model." handles={handles} variant="llm" onDelete={data?.onDelete}>
      <div className="node-copy">This node represents a language model step.</div>
    </BaseNode>
  );
}
