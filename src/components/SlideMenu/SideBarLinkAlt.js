import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPathname } from '../../selectors/router';

export const SideBarLinkAlt = ({ pathname, linkPath, name }) => (
  <div className={pathname.startsWith(linkPath) && 'active'}>
    <Link to={linkPath}>{name}</Link>
  </div>
);

const select = state => ({
  pathname: selectPathname(state),
});

export default connect(select)(SideBarLinkAlt);
