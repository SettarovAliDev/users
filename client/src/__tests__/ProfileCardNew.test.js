import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import ProfileCardNew from '../components/profile-card/ProfileCardNew';
import { rtlRender } from './test-utils';

const mockedOnEditOpenHandler = jest.fn();

it('should render ProfileCardNew', () => {
  rtlRender(<ProfileCardNew onEditOpenHandler={mockedOnEditOpenHandler} />);
  expect(screen.getByText('Create new profile')).toBeInTheDocument();
});

it('should render ProfileCardNew with spinner', () => {
  rtlRender(<ProfileCardNew onEditOpenHandler={mockedOnEditOpenHandler} />, {
    preloadedState: {
      users: {
        loaders: {
          addProfileLoading: true,
        },
      },
    },
  });
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

it('should call onEditOpenHandler on click', () => {
  rtlRender(<ProfileCardNew onEditOpenHandler={mockedOnEditOpenHandler} />);
  fireEvent.click(screen.getByTestId('add-profile-card'));
  expect(mockedOnEditOpenHandler).toHaveBeenCalled();
});
