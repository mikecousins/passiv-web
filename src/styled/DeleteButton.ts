import styled from '@emotion/styled';
import { Button } from './Button';

export const DeleteButton = styled(Button)`
  background-color: ${props => (props.disabled ? '#dddddd' : '#dc3545')};
`;
