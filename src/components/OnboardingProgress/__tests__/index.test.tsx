import React from 'react';
import { render, cleanup } from '@testing-library/react';
import OnboardingProgress from '../';

afterEach(cleanup);

test('Onboarding progress displays an indicator beside the current step', () => {
  const { getByText, getByTestId } = render(<OnboardingProgress step={1} />);

  expect(getByText('Welcome')).toBeTruthy();
  expect(getByTestId('welcome-selected')).toBeTruthy();
});

test('Onboarding progress does not crash with an invalid step', () => {
  const { getByText, queryByTestId } = render(<OnboardingProgress step={-1} />);

  expect(getByText('Welcome')).toBeTruthy();
  expect(queryByTestId('welcome-selected')).toBeNull();
});
