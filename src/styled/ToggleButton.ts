import styled from '@emotion/styled';

export const ToggleButton = styled.button`
  font-size: 24px;
  vertical-align: middle;
  padding: 0;
  margin-left: 8px;
  margin-top: -5px;
`;

export const DisabledToggleButton = styled(ToggleButton)`
  svg {
    opacity: 0.6;
  }
  opacity: 0.6;
`;

export const StateText = styled.span`
  padding: 0 0 5px 5px;
  font-size: 12pt;
  font-weight: 800;
  vertical-align: middle;
`;
