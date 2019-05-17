import React from 'react';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';

export const StyledTooltip = styled(ReactTooltip)`
  color: red;
  font-size: 18px;
  line-height: 1.2em;
  cursor: pointer;
  ul {
    list-style: disc;
    padding-left: 10px;
  }
`;

interface Props {
  html?: boolean;
}

export const Tooltip = ({ html = false }: Props) => (
  <StyledTooltip
    place="right"
    clickable={true}
    effect="solid"
    type="dark"
    event="touchstart focus mouseover"
    eventOff="mouseout"
    globalEventOff="touchstart"
    html={html}
  />
);

export default Tooltip;
