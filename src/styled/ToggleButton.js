import styled from '@emotion/styled';

export const ToggleButton = styled.button`
  font-size: 24px;
  vertical-align: middle;
`;

export const DisabledTogglebutton = styled(ToggleButton)`
  svg {
    opacity: 0.6;
  }
`;
