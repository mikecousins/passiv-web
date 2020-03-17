import React from 'react';
// import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import { selectContributionTimeframe } from '../../selectors/performance';
import { PastValue } from '../../types/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceContributionChart = (props: Props) => {
  let contributionData: PastValue[] | undefined = useSelector(
    selectContributionTimeframe,
  );
  addBuffer(contributionData);

  const data = React.useMemo(
    () => [
      {
        label: 'Contributions',
        data: contributionData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#04a286',
      },
    ],
    [contributionData],
  );
  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  return <PerformanceChart data={data} axes={axes} series={series} />;
};

const addBuffer = (data: PastValue[] | undefined) => {
  if (data !== undefined) {
    let earliestDate = '99999999';
    let value = 1;
    data.forEach(element => {
      if (element.date < earliestDate) {
        earliestDate = element.date;
        value = element.value;
      }
    });
    if (value !== 0) {
      const dateToAdd = new Date(Date.parse(earliestDate));
      dateToAdd.setDate(15);
      dateToAdd.setMonth(dateToAdd.getMonth() - 1);
      // var today = new Date();
      // var earliestValue = new Date();
      // earliestValue.setFullYear(today.getFullYear() - 1);
      // earliestValue.setMonth(today.getMonth() - 1);
      // earliestValue.setDate(1);
      let newValue: PastValue = {
        value: 0,
        date: dateToAdd.toISOString(),
        currency: data[0].currency,
      };
      data.push(newValue);
    }
  }
};

export default PerformanceContributionChart;
