import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toDollarString } from './Performance';

export const ChartBox = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  margin: 15px 0 10px;
  &.equity {
    height: 300px;
  }
`;

export const Label = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const DateString = styled.span`
  font-weight: bold;
  text-align: center; //not working for some reason
`;

export const DollarString = styled.span`
  font-weight: bold;
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
  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }: Props2) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />;
      },
    }),
    [],
  );

  if (data[0].data !== undefined) {
    return (
      <ChartBox className={className}>
        <Chart data={data} axes={axes} series={series} tooltip={tooltip} />
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

type Props2 = {
  getStyle: any;
  primaryAxis: any;
  datum: any;
};

export const CustomTooltip: FunctionComponent<Props2> = ({
  getStyle,
  primaryAxis,
  datum,
}) => {
  if (datum === undefined) {
    return null;
  } else {
    return (
      <div>
        <DateString>{formatDate(datum?.primary).toString()}</DateString>
        <br />
        <Label>
          <svg height="16" width="20">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="white"
              strokeWidth="1"
              fill={getStyle(datum).fill}
            />
          </svg>
          {datum?.seriesLabel}
        </Label>
        <DollarString>
          $
          {toDollarString(
            datum?.secondary < 0 ? datum?.secondary * -1 : datum?.secondary,
          )}
        </DollarString>
      </div>
    );
  }
};

const dtfMonth = new Intl.DateTimeFormat('en', { month: 'short' });

const formatDate = (date: Date) => {
  if (typeof date !== 'object') {
    return date;
  } else {
    return (
      dtfMonth.format(date) + ' ' + date.getDate() + ', ' + date.getFullYear()
    );
  }
};

export default PerformanceChart;
