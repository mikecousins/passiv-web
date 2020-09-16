import styled from '@emotion/styled';
import { css } from '@emotion/core';

type Props = {
  columns?: string;
};

const dynamicColumns = ({ columns }: Props) =>
  css`
    grid-template-columns: ${columns};
  `;

const Grid = styled.div<Props>`
  @media (min-width: 900px) {
    display: grid;
    grid-gap: 20px;
  }
  ${dynamicColumns};
`;

export default Grid;
