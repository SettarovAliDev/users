import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from '../components/header/Header';
import { rtlRender, normalizedUsers } from './test-utils';

it('should render Header component for admin', () => {
  rtlRender(<Header />, {
    preloadedState: {
      auth: {
        userId: 1,
        isAdmin: true,
      },
      users: {
        entities: normalizedUsers,
      },
    },
  });

  const dashboardText = screen.getByText(/dashboard/i);
  expect(dashboardText).toBeInTheDocument();
});

it('should render Header component for user', () => {
  rtlRender(<Header />, {
    preloadedState: {
      auth: {
        userId: 2,
        isAdmin: false,
      },
      users: {
        entities: normalizedUsers,
      },
    },
  });

  const dashboardText = screen.queryByText(/dashboard/i);
  expect(dashboardText).toBe(null);
});

it('should go to home page', () => {
  rtlRender(<Header />, {
    preloadedState: {
      auth: {
        userId: 2,
        isAdmin: false,
      },
      users: {
        entities: normalizedUsers,
      },
    },
  });

  const homeElement = screen.getByTestId('home');
  fireEvent.click(homeElement);
});
