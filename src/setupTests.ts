// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import { cleanup } from '@testing-library/react';
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
