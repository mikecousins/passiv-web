import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  value: number;
};

const Stat = styled.span`
  font-weight: bold;
`;

const PerformanceStat: FunctionComponent<Props> = ({ title, value }) => (
  <Stat>
    {title}
    <br />${value}
    <br />
    <br />
  </Stat>
);

export default PerformanceStat;
