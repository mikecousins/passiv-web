import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPathname } from '../../selectors/router';

export const SideBarLinkAlt = ({ pathname, linkPath, name }) => {
  let className = null;
  if (pathname.startsWith(linkPath)) {
    className = 'active';
  }
  return (
    <div className={className}>
      <Link to={linkPath}>{name}</Link>
    </div>
  );
};

const select = state => ({
  pathname: selectPathname(state),
});

export default connect(select)(SideBarLinkAlt);
