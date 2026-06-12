// BaseNode.js
// Reusable base component for all React Flow nodes
// Eliminates duplication across node implementations

import React from 'react';
import { Handle, Position } from 'reactflow';

const baseNodeStyle = {
  width: 200,
  height: 80,
  border: '1px solid black',
  backgroundColor: '#fff',
  borderRadius: '4px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const headerStyle = {
  fontWeight: 'bold',
  marginBottom: '8px',
  fontSize: '14px',
};

const contentContainerStyle = {
  flex: 1,
  fontSize: '12px',
  overflow: 'hidden',
};

/**
 * BaseNode - Reusable base component for React Flow nodes
 * 
 * @param {Object} props
 * @param {string} props.title - Node title displayed at the top
 * @param {React.ReactNode} props.children - Node-specific content
 * @param {Array<Object>} props.handles - Array of handle configurations
 *   Each handle object should have:
 *   - type: 'target' | 'source'
 *   - position: Position constant from reactflow
 *   - id: unique handle identifier
 *   - style: (optional) custom styles for the handle
 * @param {Object} props.style - (optional) custom style overrides
 * 
 * @example
 * <BaseNode
 *   title="Input Node"
 *   handles={[
 *     { type: 'source', position: Position.Right, id: 'output' }
 *   ]}
 * >
 *   <input type="text" value={text} onChange={handleChange} />
 * </BaseNode>
 */
export const BaseNode = ({ 
  title, 
  children, 
  handles = [], 
  style = {},
  contentStyle = {},
}) => {
  return (
    <div style={{ ...baseNodeStyle, ...style }}>
      {/* Render all configured handles */}
      {handles.map((handleConfig) => (
        <Handle
          key={`${handleConfig.id}`}
          type={handleConfig.type}
          position={handleConfig.position}
          id={handleConfig.id}
          style={handleConfig.style || {}}
        />
      ))}

      {/* Node header/title */}
      {title && <div style={headerStyle}>{title}</div>}

      {/* Node-specific content */}
      {children && <div style={{ ...contentContainerStyle, ...contentStyle }}>{children}</div>}
    </div>
  );
};
