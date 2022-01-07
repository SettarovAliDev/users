import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ProfileCards from '../components/profile-cards/ProfileCards';
import { rtlRender, usersData } from './test-utils';

it('should render ProfileCards page', () => {
  rtlRender(<ProfileCards profiles={usersData[0].profiles} />);

  const createProfileText = screen.getByText(/create new profile/i);
  expect(createProfileText).toBeInTheDocument();
});
