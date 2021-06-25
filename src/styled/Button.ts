import styled from '@emotion/styled';

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? '#003aa1' : 'var(--brand-blue)'};
  opacity: ${(props) => (props.disabled ? '.7' : '1')};
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 3px;
  font-weight: 600;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export const SmallButton = styled(Button)`
  padding: 11px 40px;
`;
