import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Users from '../pages/users/Users';
import { rtlRender, normalizedUsers } from './test-utils';

it('should render Users component', () => {
  rtlRender(<Users />, {
    preloadedState: {
      users: {
        entities: normalizedUsers,
      },
    },
  });

  const usersText = screen.getByText(/users:/i);
  expect(usersText).toBeInTheDocument();
});
