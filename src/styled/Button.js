import styled from '@emotion/styled';

export const Button = styled.button`
  background-color: ${props => (props.disabled ? '#003aa1' : '#003BA2')};
  opacity: ${props => (props.disabled ? '.7' : '1')};
  border: none;
  color: white;
  padding: 14px 18px 16px;
  margin: 5px;
`;

export const SmallButton = styled.button`
  background-color: ${props => (props.disabled ? '#003aa1' : '#003BA2')};
  opacity: ${props => (props.disabled ? '.7' : '1')};
  border: none;
  color: white;
  padding: 5px;
  margin: 5px;
`;
