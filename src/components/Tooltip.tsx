import React from 'react';
import ReachTooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';

interface Props {
  children: JSX.Element;
  label: string;
}

export const Tooltip = ({ children, label }: Props) => (
  <ReachTooltip label={label}>
    <span>{children}</span>
  </ReachTooltip>
);

export default Tooltip;
