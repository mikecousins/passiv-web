import styled from '@emotion/styled';

type ButtonProps = {
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.disabled
      ? '#003aa1'
      : props.backgroundColor
      ? props.backgroundColor
      : 'var(--brand-blue)'};
  opacity: ${(props) => (props.disabled ? '.7' : '1')};
  border: none;
  text-align: center;
  color: ${(props) => (props.color ? props.color : 'var(--white)')};
  padding: 12px 30px;
  border-radius: 3px;
  font-weight: 600;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export const SmallButton = styled(Button)`
  padding: 8px 20px;
`;

export const TransparentButton = styled(Button)`
  padding: 11px 28px;
  background-color: transparent;
  color: ${(props) => (props.color ? props.color : 'var(--brand-blue)')};
  border: 1px solid
    ${(props) => (props.color ? props.color : 'var(--brand-blue)')};
`;

export const SmallTransparentButton = styled(TransparentButton)`
  padding: 7px 26px;
`;
