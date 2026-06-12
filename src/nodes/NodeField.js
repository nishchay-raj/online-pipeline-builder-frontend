import React from 'react';

export const NodeField = ({ label, children, hint, className = '' }) => {
  const fieldClassName = ['node-field', className].filter(Boolean).join(' ');

  return (
    <label className={fieldClassName}>
      <span className="node-field__label">{label}</span>
      {children}
      {hint ? <span className="node-field__hint">{hint}</span> : null}
    </label>
  );
};