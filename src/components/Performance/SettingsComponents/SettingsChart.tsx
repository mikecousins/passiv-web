import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ChartBox = styled.div`
  position: relative;
  height: 120px;
  width: 18%;
  &.selected {
    background: lightgrey;
  }
`;

type Props = {
  data: any;
  axes: any;
  series: any;
  className: string;
};

export const SettingsChart: FunctionComponent<Props> = ({
  data,
  axes,
  series,
  className,
}) => {
  if (data[0].data !== undefined) {
    return (
      <ChartBox className={className}>
        <Chart data={data} axes={axes} series={series} tooltip={null} />
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

export default SettingsChart;
