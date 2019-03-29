import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '..';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
