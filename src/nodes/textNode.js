import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';

import {
  Position,
  useUpdateNodeInternals,
} from 'reactflow';

import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

const MIN_NODE_WIDTH = 260;
const MAX_NODE_WIDTH = 500;

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || '{{input}}'
  );

  const textareaRef = useRef(null);

  const updateNodeInternals = useUpdateNodeInternals();

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

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variableNames, updateNodeInternals]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    const nodeElement = textarea?.closest('.workflow-node');

    if (!textarea || !nodeElement) {
      return;
    }

    const computedStyle =
      window.getComputedStyle(textarea);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const textLines = currText.split('\n');

    if (context) {
      context.font =
        computedStyle.font ||
        `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

      const widestLine = textLines.reduce(
        (widest, line) => {
          const measuredWidth =
            context.measureText(line || ' ').width;

          return Math.max(widest, measuredWidth);
        },
        0
      );

      const nextWidth = clamp(
        Math.ceil(widestLine + 92),
        MIN_NODE_WIDTH,
        MAX_NODE_WIDTH
      );

      nodeElement.style.width = `${nextWidth}px`;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    nodeElement.style.height = 'auto';
    nodeElement.style.height = `${nodeElement.scrollHeight}px`;
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const variableHandles = variableNames.map(
    (variableName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-var-${variableName}`,
      style: {
        top: `${
          ((index + 1) /
            (variableNames.length + 1)) *
          100
        }%`,
      },
    })
  );

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
      badge="CONTENT"
      description="Transforms incoming values into editable text."
      handles={handles}
      style={{
        height: 'auto',
        minHeight: 120,
      }}
      contentStyle={{
        overflow: 'visible',
      }}
      variant="text"
      onDelete={data?.onDelete}
    >
      <NodeField
        label="Text"
        hint={`${variableNames.length} variable${
          variableNames.length === 1 ? '' : 's'
        } detected`}
      >
        <textarea
          className="node-control node-control--textarea"
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
        />
      </NodeField>
    </BaseNode>
  );
};