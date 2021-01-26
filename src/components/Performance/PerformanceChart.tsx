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
  &.dividends {
    height: 220px;
  }
  &.dividendsTimeline {
    height: 220px;
  }
  &.dividendsExtended {
    height: 420px;
  }
  &.dividendsTimelineExtended {
    height: 380px;
  }
`;

export const Label = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  &.selected {
    font-weight: bold;
  }
`;

export const Total = styled.div`
  padding-top: 6px;
  font-size: 11pt;
  font-weight: bold;
  color: white;
`;

export const DateString = styled.span`
  font-weight: bold;
  text-align: center; //not working for some reason
`;

export const DollarString = styled.span`
  &.selected {
    font-weight: bold;
  }
`;

export const ExpandChart = styled.span`
  float: right;
  &:hover {
    color: ${'#04a286'};
  }
`;

type Props = {
  data: any;
  axes: any;
  series: any;
  className: string;
  displayTotal: boolean;
};

export const PerformanceChart: FunctionComponent<Props> = ({
  data,
  axes,
  series,
  className,
  displayTotal,
}) => {
  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }: Props2) => {
        return (
          <CustomTooltip {...{ getStyle, primaryAxis, datum, displayTotal }} />
        );
      },
    }),
    [displayTotal],
  );

  if (data[0] !== undefined && data[0].data !== undefined) {
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
  displayTotal: boolean;
};

export const CustomTooltip: FunctionComponent<Props2> = ({
  getStyle,
  primaryAxis,
  datum,
  displayTotal,
}) => {
  if (datum === undefined) {
    return null;
  } else {
    const showAll = datum.group.length < 3;
    let allDatums = datum.group;

    if (!showAll) {
      allDatums = allDatums.filter((x: any) => x.secondary !== 0).reverse();
    }
    let total = 0;
    datum.group.forEach((element: any) => {
      total += element.secondary;
    });

    return (
      <div>
        <DateString>{formatDate(datum?.primary).toString()}</DateString>
        <br />

        {allDatums.map((element: any) => {
          const selected = datum.seriesID === element.seriesID;
          return (
            <React.Fragment key={element.seriesID}>
              <Label className={selected ? 'selected' : 'unselected'}>
                <svg height="16" width="20">
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="white"
                    strokeWidth={selected ? '2' : '1'}
                    fill={getStyle(element).fill}
                  />
                </svg>
                {element?.seriesLabel}
              </Label>
              <DollarString className={selected ? 'selected' : 'unselected'}>
                {toDollarStringWithSigns(element?.secondary)}
              </DollarString>
            </React.Fragment>
          );
        })}
        {displayTotal && <Total>Total: {toDollarStringWithSigns(total)}</Total>}
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

const toDollarStringWithSigns = (total: any) => {
  const dollarString = toDollarString(total);
  return dollarString[0] !== '-'
    ? '$' + dollarString
    : '-$' + dollarString.slice(1);
};

export default PerformanceChart;
