import React from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const ChartBox = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  margin-bottom: 10px;
`;

type Props = {
  data: any;
  axes: any;
  series: any;
};

export const PerformanceChart = (props: Props) => {
  if (props.data[0].data !== undefined) {
    return (
      <ChartBox>
        <Chart
          data={props.data}
          axes={props.axes}
          series={props.series}
          tooltip
        />
      </ChartBox>
    );
  } else {
    return (
      <ChartBox>
        <FontAwesomeIcon icon={faSpinner} spin />
      </ChartBox>
    );
  }
};

export default PerformanceChart;
