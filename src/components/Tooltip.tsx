import React from 'react';
import ReachTooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';

interface Props {
  children: JSX.Element;
  label: string | null;
}

export const Tooltip = ({ children, label }: Props) => {
  return label ? (
    <ReachTooltip label={label}>
      <span>{children}</span>
    </ReachTooltip>
  ) : (
    <span>{children}</span>
  );
};

export default Tooltip;
