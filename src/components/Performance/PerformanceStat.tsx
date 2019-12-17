import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  value: number;
};

const Stat = styled.span`
  font-weight: bold;
`;

export const PerformanceStat = (props: Props) => {
  let positive = props.value >= 0;

  return (
    <Stat>
      {props.title}
      <br />${props.value}
      <br />
      <br />
    </Stat>
  );
};

export default PerformanceStat;
