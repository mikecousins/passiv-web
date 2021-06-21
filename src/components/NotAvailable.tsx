import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { P } from '../styled/GlobalElements';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  svg {
    color: var(--brand-green);
    margin-right: 5px;
  }
`;

type Props = {
  message: string;
};
const NotAvailable = ({ message }: Props) => {
  return (
    <Container>
      <FontAwesomeIcon icon={faInfoCircle} />
      <P>{message}</P>
    </Container>
  );
};

export default NotAvailable;
