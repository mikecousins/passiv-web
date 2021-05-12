import React from 'react';
import { Link } from 'react-router-dom';
import { preloadRouteComponent } from '../apps/App';

type Props = {
  path: string;
  className?: string;
  children?: React.ReactNode;
};
const PreLoadLink = ({ path, children, className }: Props) => {
  return (
    <Link
      to={path}
      onMouseEnter={() => preloadRouteComponent(path)}
      className={className}
    >
      {children}
    </Link>
  );
};

export default PreLoadLink;
