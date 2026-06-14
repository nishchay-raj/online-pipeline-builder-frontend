// BaseNode.js
// Reusable base component for all React Flow nodes

import React from 'react';
import { Handle } from 'reactflow';

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
