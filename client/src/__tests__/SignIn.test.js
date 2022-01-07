import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SignIn from '../pages/auth/SignIn';
import { rtlRender } from './test-utils';

it('should render SignIn page', () => {
  rtlRender(<SignIn />);
});

it('should render SignIn page with error', () => {
  rtlRender(<SignIn />, {
    preloadedState: {
      auth: {
        errors: {
          signInError: 'Error text',
        },
      },
    },
  });
  const errorText = screen.getByText(/error text/i);
  expect(errorText).toBeInTheDocument();
});
