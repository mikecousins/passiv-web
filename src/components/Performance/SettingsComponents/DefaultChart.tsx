import React, { FunctionComponent } from 'react';
import SettingsChart from './SettingsChart';

type Props = {
  selected: boolean | undefined;
};
export const DefaultChart: FunctionComponent<Props> = ({ selected }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: simpleExample?.map((a) => {
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

  const series = React.useMemo(() => ({ type: 'line', showPoints: true }), []);

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

export default DefaultChart;

const simpleExample = [
  {
    date: '2020-04-01T07:51:09.315141Z',
    value: 54565,
    currency: 'CAD',
  },
];
