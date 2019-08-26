import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPathname } from '../../selectors/router';

type Props = {
  linkPath: string;
  name: string;
}

export const SideBarLinkAlt = ({ linkPath, name }: Props) => {
  const pathname = useSelector(selectPathname);
  let className = undefined;
  if (pathname.startsWith(linkPath)) {
    className = 'active';
  }
  return (
    <div className={className}>
      <Link to={linkPath}>{name}</Link>
    </div>
  );
};

export default SideBarLinkAlt;
