import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const durationInput = getByTestId("duration");
  expect(durationInput).toBeInTheDocument();

  const amountInput = getByTestId("amount");
  expect(amountInput).toBeInTheDocument();
});
