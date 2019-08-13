import styled from '@emotion/styled';
import { css } from '@emotion/core';

const dynamicColor = props =>
  css`
    background: ${props.background};
  `;

export default styled.div`
  background: var(--white);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px 20px 20px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    padding: 15px;
  }
  ${dynamicColor};
`;
