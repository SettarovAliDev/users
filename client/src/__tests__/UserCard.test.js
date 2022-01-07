import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import UserCard from '../components/user-card/UserCard';
import { usersData } from './test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const renderWithRouter = (component) => {
  return {
    ...render(<MemoryRouter>{component}</MemoryRouter>),
  };
};

const user = usersData[0];

it('should render UserCard correctly', () => {
  const tree = renderer.create(<UserCard user={user} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should equal to user fields', () => {
  const { getByTestId } = render(<UserCard user={user} />);
  expect(getByTestId('username')).toHaveTextContent(user.username);
  expect(getByTestId('email')).toHaveTextContent(user.email);
  expect(getByTestId('profiles')).toHaveTextContent(
    `${Object.values(user.profiles).length} profiles`
  );
});

it('should navigate to user page', () => {
  const { getByTestId } = renderWithRouter(<UserCard user={user} />);
  fireEvent.click(getByTestId('card'));
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`${user.id}`);
});
