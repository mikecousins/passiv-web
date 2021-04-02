import React, { FunctionComponent } from 'react';
import SettingsChart from './SettingsChart';

type Props = {
  selected: boolean | undefined;
};
export const DetailedChart: FunctionComponent<Props> = ({ selected }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: detailedExample?.map((a) => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#04a286',
      },
    ],
    [],
  );

  const series = React.useMemo(() => ({ type: 'line', showPoints: false }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false },
    ],
    [],
  );

  return (
    <React.Fragment>
      <SettingsChart
        data={data}
        axes={axes}
        series={series}
        className={selected ? 'selected' : 'unselected'}
      />
    </React.Fragment>
  );
};

export default DetailedChart;

const detailedExample = [
  {
    date: '2020-04-02T07:52:45.092867Z',
    value: 55433.62495515,
    currency: 'CAD',
  },
];
