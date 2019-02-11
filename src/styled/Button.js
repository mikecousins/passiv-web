import styled from '@emotion/styled';

export const Button = styled.button`
  background-color: ${props => props.disabled ? '#dddddd' : '#003BA2'};
  border: none;
  color: white;
  padding: 14px 18px 16px;
  margin: 5px;
`;
