import React from 'react';
import ReachTooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';
import styled from '@emotion/styled';

interface Props {
  children: JSX.Element;
  label: string | null;
  additionalComponent: JSX.Element;
}

const StyledTooltip = styled(ReachTooltip)`
  white-space: normal;
  max-width: 300px;
  font-size: 16px;
  line-height: 22px;
  z-index: 3;
  background: hsla(232, 13%, 12%, 0.75);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
`;

const Tooltip = ({ children, label, additionalComponent }: Props) => {
  return label ? (
    <StyledTooltip
      label={
        <>
          {label}
          <span>{additionalComponent}</span>
        </>
      }
    >
      <span>{children}</span>
    </StyledTooltip>
  ) : (
    <span>{children}</span>
  );
};
Tooltip.defaultProps = {
  additionalComponent: <></>,
};

export default Tooltip;
