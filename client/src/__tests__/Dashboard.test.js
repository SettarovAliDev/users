import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard, { calculateAge } from '../pages/dashboard/Dashboard';
import { rtlRender, normalizedUsers } from './test-utils';

it('should render Dashboard page', () => {
  rtlRender(<Dashboard />, {
    preloadedState: {
      users: {
        entities: normalizedUsers,
      },
    },
  });

  const dashboardText = screen.getByText(/profiles over 18 years old/i);
  expect(dashboardText).toBeInTheDocument();
});

it('should calculate age correct', () => {
  calculateAge(Date.parse(new Date()));
});
