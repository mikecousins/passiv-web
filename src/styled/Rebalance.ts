import styled from '@emotion/styled';

export const RebalanceAlert = styled.div`
  position: absolute;
  top: 47%;
  transform: translateY(-50%);
  left: 5px;
  span {
    width: 8px;
    height: 8px;
    display: block;
    border-radius: 50%;
  }
`;

export const RebalanceAlertSpinner = styled(RebalanceAlert)`
  left: 9px;
  svg {
    font-size: 15px;
  }
`;
