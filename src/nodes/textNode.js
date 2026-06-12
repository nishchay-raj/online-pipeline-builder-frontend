// textNode.js

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const variableNames = useMemo(() => {
    const variables = [];
    const seen = new Set();
    const pattern = /\{\{\s*([^{}]+?)\s*\}\}/g;

    for (const match of currText.matchAll(pattern)) {
      const variableName = match[1].trim();

      if (!variableName || seen.has(variableName)) {
        continue;
      }

      seen.add(variableName);
      variables.push(variableName);
    }

    return variables;
  }, [currText]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const variableHandles = variableNames.map((variableName, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-var-${variableName}`,
    style: {
      top: `${((index + 1) / (variableNames.length + 1)) * 100}%`,
    },
  }));

  const handles = [
    ...variableHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      title="Text"
      handles={handles}
      style={{ height: 'auto', minHeight: 80 }}
      contentStyle={{ overflow: 'visible' }}
    >
      <label style={{ display: 'block' }}>
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange}
          rows={1}
          style={{
            display: 'block',
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
            font: 'inherit',
            marginTop: '4px',
          }}
        />
      </label>
    </BaseNode>
  );
}
