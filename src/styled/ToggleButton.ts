import styled from '@emotion/styled';

export const ToggleButton = styled.button`
  font-size: 24px;
  vertical-align: middle;
  padding: 0;
  margin-left: 3px;
  margin-top: 1px;
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
`;

export const Row = styled.div`
  margin-top: 18px;
`;
