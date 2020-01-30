import React from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-charts';

export const ChartBox = styled.div`
  position: relative;
  height: 180px;
  width: 60%;
  float: right;
  clear: both;
  margin-bottom: 10px;
`;

type Props = {
  data: any;
  axes: any;
};

export const PerformanceStat = (props: Props) => {
  return (
    <ChartBox>
      <Chart data={props.data} axes={props.axes} tooltip />
    </ChartBox>
  );
};

export default PerformanceStat;
