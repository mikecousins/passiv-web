import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroups } from '../selectors/groups';

type Props = {
  group: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
};

const PortfolioGroupPicker = ({ group, onChange, disabled }: Props) => {
  const groups = useSelector(selectGroups);

  if (!groups) {
    return null;
  }

  return (
    <React.Fragment>
      <select disabled={disabled} value={group} onChange={onChange}>
        {groups.map(group => (
          <option value={group.id} key={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default PortfolioGroupPicker;
