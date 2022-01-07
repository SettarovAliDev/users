import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SignUp from '../pages/auth/SignUp';
import { rtlRender } from './test-utils';

it('should render SignUp page', () => {
  rtlRender(<SignUp />);
});

it('should render SignUp page with error', () => {
  rtlRender(<SignUp />, {
    preloadedState: {
      auth: {
        errors: {
          signUpError: 'Error text',
        },
      },
    },
  });
  const errorText = screen.getByText(/error text/i);
  expect(errorText).toBeInTheDocument();
});
