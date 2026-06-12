// BaseNode.js
// Reusable base component for all React Flow nodes
// Eliminates duplication across node implementations

import React from 'react';
import { Handle } from 'reactflow';

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
  badge,
  description,
  children, 
  handles = [], 
  style = {},
  contentStyle = {},
  className = '',
  variant = 'default',
  onDelete,
}) => {
  const rootClassName = ['workflow-node', `workflow-node--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const handleDelete = (event) => {
    event.stopPropagation();

    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={rootClassName} style={style}>
      <div className="workflow-node__accent" aria-hidden="true" />
      {onDelete && (
        <button
          type="button"
          className="workflow-node__delete"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={handleDelete}
          aria-label={`Delete ${title || 'node'}`}
        >
          ✕
        </button>
      )}
      {handles.map((handleConfig) => (
        <Handle
          key={`${handleConfig.id}`}
          type={handleConfig.type}
          position={handleConfig.position}
          id={handleConfig.id}
          className={['workflow-node__handle', `workflow-node__handle--${handleConfig.type}`, handleConfig.className]
            .filter(Boolean)
            .join(' ')}
          style={handleConfig.style || {}}
        />
      ))}

      {(badge || title || description) && (
        <div className="workflow-node__header">
          {badge && <span className="workflow-node__badge">{badge}</span>}
          {title && <div className="workflow-node__title">{title}</div>}
          {description && <div className="workflow-node__description">{description}</div>}
        </div>
      )}

      {children && <div className="workflow-node__content" style={contentStyle}>{children}</div>}
    </div>
  );
};
