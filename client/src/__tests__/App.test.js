import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { setupServer } from 'msw/node';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';
import { handlers, rtlRender } from './test-utils';

const server = setupServer(...handlers);

beforeEach(() => window.localStorage.removeItem('token'));

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const signIn = async (email, password) => {
  rtlRender(<App />);

  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(inputEmail, {
    target: { value: email },
  });
  expect(inputEmail.value).toBe(email);

  fireEvent.change(inputPassword, {
    target: { value: password },
  });
  expect(inputPassword.value).toBe(password);

  fireEvent.click(signInButton);
  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
};

it('should render app and login as admin', async () => {
  await signIn('ali@g', '123456');
});

it('should render app and login as user', async () => {
  await signIn('settar@g', '123456');
});

it('should render app and login by token as admin', async () => {
  window.localStorage.setItem(
    'token',
    JSON.stringify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks'
    )
  );
  // TODO: fix for mock localStorage
  rtlRender(<App />);

  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
});

it('should render app and signup as admin', async () => {
  rtlRender(<App />);

  const signUpLink = screen.getByRole('link', { name: /sign up/i });
  fireEvent.click(signUpLink);

  const inputUsername = screen.getByLabelText(/username/i);
  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const inputIsAdmin = screen.getByLabelText(/is admin/i);
  const signUpButton = screen.getByRole('button', { name: /sign up/i });

  fireEvent.change(inputUsername, {
    target: { value: 'alina' },
  });
  expect(inputUsername.value).toBe('alina');

  fireEvent.change(inputEmail, {
    target: { value: 'alina@g' },
  });
  expect(inputEmail.value).toBe('alina@g');

  fireEvent.change(inputPassword, {
    target: { value: '123456' },
  });
  expect(inputPassword.value).toBe('123456');

  fireEvent.click(inputIsAdmin);
  expect(inputIsAdmin.checked).toBe(true);

  fireEvent.click(signUpButton);

  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
});

it('should render app and signup as user', async () => {
  rtlRender(<App />);

  const signUpLink = screen.getByRole('link', { name: /sign up/i });
  fireEvent.click(signUpLink);

  const inputUsername = screen.getByLabelText(/username/i);
  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const inputIsAdmin = screen.getByLabelText(/is admin/i);
  const signUpButton = screen.getByRole('button', { name: /sign up/i });

  fireEvent.change(inputUsername, {
    target: { value: 'alina' },
  });
  expect(inputUsername.value).toBe('alina');

  fireEvent.change(inputEmail, {
    target: { value: 'alina@g' },
  });
  expect(inputEmail.value).toBe('alina@g');

  fireEvent.change(inputPassword, {
    target: { value: '123456' },
  });
  expect(inputPassword.value).toBe('123456');

  expect(inputIsAdmin.checked).toBe(false);

  fireEvent.click(signUpButton);

  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
});

it('should add new profile', async () => {
  await signIn('ali@g', '123456');

  fireEvent.click(screen.getByTestId('add-profile-card'));

  const editProfileButton = screen.getByTestId('add-profile');
  expect(editProfileButton).toBeInTheDocument();

  const inputName = screen.getByLabelText(/name/i);
  const inputGender = screen.getByTestId('gender-m');
  const inputBirthDate = screen.getByLabelText(/birthdate/i);
  const inputCity = screen.getByLabelText(/city/i);

  fireEvent.change(inputName, {
    target: { value: 'Settarov Ali' },
  });
  expect(inputName.value).toBe('Settarov Ali');

  fireEvent.click(inputGender);
  expect(inputGender.checked).toBe(true);

  fireEvent.change(inputBirthDate, {
    target: { value: '1996-01-05' },
  });
  expect(inputBirthDate.value).toBe('1996-01-05');

  fireEvent.change(inputCity, {
    target: { value: 'New York' },
  });
  expect(inputCity.value).toBe('New York');

  fireEvent.click(editProfileButton);

  const newProfile = await screen.findByText(/new york/i);
  expect(newProfile).toBeInTheDocument();
});

it('should edit selected profile', async () => {
  await signIn('ali@g', '123456');

  const editProfileButtons = screen.getAllByTestId('edit-profile');
  fireEvent.click(editProfileButtons[0]);

  const inputName = screen.getByLabelText(/name/i);
  const inputGender = screen.getByTestId('gender-f');
  const inputBirthDate = screen.getByLabelText(/birthdate/i);
  const inputCity = screen.getByLabelText(/city/i);

  fireEvent.change(inputName, {
    target: { value: 'Settarov Settar' },
  });
  expect(inputName.value).toBe('Settarov Settar');

  fireEvent.click(inputGender);
  expect(inputGender.checked).toBe(true);

  fireEvent.change(inputBirthDate, {
    target: { value: '1980-01-01' },
  });
  expect(inputBirthDate.value).toBe('1980-01-01');

  fireEvent.change(inputCity, {
    target: { value: 'Los Angeles' },
  });
  expect(inputCity.value).toBe('Los Angeles');

  const changeProfileButton = screen.getByTestId('add-profile');
  fireEvent.click(changeProfileButton);

  const newProfile = await screen.findByText(/settarov settar/i);
  expect(newProfile).toBeInTheDocument();
});

it('should delete selected profile', async () => {
  await signIn('ali@g', '123456');

  const deleteProfileButtons = screen.getAllByTestId('delete-profile');
  fireEvent.click(deleteProfileButtons[0]);

  const deleteProfileButtonsLeft = await screen.findAllByTestId(
    'delete-profile'
  );
  expect(deleteProfileButtonsLeft.length).toBe(1);
});
