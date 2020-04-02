import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const ChartBox = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  margin-bottom: 10px;
  &.equity {
    height: 300px;
  }
`;

type Props = {
  data: any;
  axes: any;
  series: any;
  className: string;
};

export const PerformanceChart: FunctionComponent<Props> = ({
  data,
  axes,
  series,
  className,
}) => {
  if (data[0].data !== undefined) {
    return (
      <ChartBox className={className}>
        <Chart data={data} axes={axes} series={series} tooltip />
      </ChartBox>
    );
  } else {
    return (
      <ChartBox className={className}>
        <FontAwesomeIcon icon={faSpinner} spin />
      </ChartBox>
    );
  }
};

export default PerformanceChart;
