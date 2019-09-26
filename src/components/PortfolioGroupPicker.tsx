import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroups } from '../selectors/groups';
import { Select } from '../styled/Form';

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
      <Select disabled={disabled} value={group} onChange={onChange}>
        {groups.map(group => (
          <option value={group.id} key={group.id}>
            {group.name}
          </option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default PortfolioGroupPicker;
