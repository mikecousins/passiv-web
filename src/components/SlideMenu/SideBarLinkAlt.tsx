import React from 'react';
import { useSelector } from 'react-redux';
import { selectPathname } from '../../selectors/router';
import PreLoadLink from '../PreLoadLink';

type Props = {
  linkPath: string;
  name: string;
};

const SideBarLinkAlt = ({ linkPath, name }: Props) => {
  const pathname = useSelector(selectPathname);
  let className = undefined;
  if (pathname.startsWith(linkPath)) {
    className = 'active';
  }
  return (
    <div className={className}>
      <PreLoadLink path={linkPath}>{name}</PreLoadLink>
    </div>
  );
};

export default SideBarLinkAlt;
