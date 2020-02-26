import React from 'react';
import ReachTooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';
import styled from '@emotion/styled';

interface Props {
  children: JSX.Element;
  label: string | null;
}

const StyledTooltip = styled(ReachTooltip)`
  max-width: 300px;
  white-space: normal;
`;

export const Tooltip = ({ children, label }: Props) => {
  return label ? (
    <StyledTooltip label={label}>
      <span>{children}</span>
    </StyledTooltip>
  ) : (
    <span>{children}</span>
  );
};

export default Tooltip;
