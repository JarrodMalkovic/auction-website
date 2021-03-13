import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '../../src/pages/index';

it('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Auction Website/i)).toBeInTheDocument();
});
