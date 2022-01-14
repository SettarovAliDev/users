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

const signUp = async (
  username,
  email,
  password,
  isAdmin,
  duplicateUsername,
  duplicateEmail
) => {
  rtlRender(<App />);

  const signUpLink = screen.getByRole('link', { name: /sign up/i });
  fireEvent.click(signUpLink);

  const inputUsername = screen.getByLabelText(/username/i);
  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const inputIsAdmin = screen.getByLabelText(/is admin/i);
  const signUpButton = screen.getByRole('button', { name: /sign up/i });

  fireEvent.change(inputUsername, {
    target: { value: username },
  });
  expect(inputUsername.value).toBe(username);

  fireEvent.change(inputEmail, {
    target: { value: email },
  });
  expect(inputEmail.value).toBe(email);

  fireEvent.change(inputPassword, {
    target: { value: password },
  });
  expect(inputPassword.value).toBe(password);

  if (isAdmin) {
    fireEvent.click(inputIsAdmin);
  }
  expect(inputIsAdmin.checked).toBe(isAdmin);

  fireEvent.click(signUpButton);

  if (duplicateUsername) {
    const errorMessage = await screen.findByText(/username is already in use/i);
    expect(errorMessage).toBeInTheDocument();
    return;
  }

  if (duplicateEmail) {
    const errorMessage = await screen.findByText(/email is already in use/i);
    expect(errorMessage).toBeInTheDocument();
    return;
  }

  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
};

it('should login as admin', async () => {
  await signIn('ali@g', '123456');
});

it('should login as user', async () => {
  await signIn('settar@g', '123456');
});

it('should login with wrong email', async () => {
  rtlRender(<App />);

  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(inputEmail, {
    target: { value: 'wrong@g' },
  });
  expect(inputEmail.value).toBe('wrong@g');

  fireEvent.change(inputPassword, {
    target: { value: '123456' },
  });
  expect(inputPassword.value).toBe('123456');

  fireEvent.click(signInButton);

  const logOut = await screen.findByText(/invalid user/i);
  expect(logOut).toBeInTheDocument();
});

it('should login by token as admin', async () => {
  window.localStorage.setItem(
    'token',
    JSON.stringify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks'
    )
  );
  rtlRender(<App />);

  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
});

it('should login with wrong token', async () => {
  window.localStorage.setItem('token', JSON.stringify('wrong_token'));
  rtlRender(<App />);

  const tokeExpired = await screen.findByText(/token expired/i);
  expect(tokeExpired).toBeInTheDocument();
});

it('should signup as admin', async () => {
  await signUp('alina', 'alina@g', '123456', true);
});

it('should signup as user', async () => {
  await signUp('alina', 'alina@g', '123456', false);
});

it('should signup with existing email', async () => {
  await signUp('ali', 'ali@g', '123456', true, true);
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

it('should edit selected user', async () => {
  await signIn('ali@g', '123456');

  const editUserButton = screen.getByTestId('edit-user');
  fireEvent.click(editUserButton);

  const inputUsername = screen.getByLabelText(/username/i);
  const inputEmail = screen.getByLabelText(/email/i);
  const inputRole = screen.getByTestId('role-a');

  fireEvent.change(inputUsername, {
    target: { value: 'john' },
  });
  expect(inputUsername.value).toBe('john');

  fireEvent.change(inputEmail, {
    target: { value: 'john@g' },
  });
  expect(inputEmail.value).toBe('john@g');

  fireEvent.click(inputRole);
  expect(inputRole.checked).toBe(true);

  const changeProfileButton = screen.getByTestId('submit-edit-user');
  fireEvent.click(changeProfileButton);

  const editedUser = await screen.findByText(/john@g/i);
  expect(editedUser).toBeInTheDocument();
});

it('should delete selected user', async () => {
  await signIn('ali@g', '123456');

  const deleteUserButton = screen.getByTestId('delete-user');
  fireEvent.click(deleteUserButton);
});

it('should logout', async () => {
  await signIn('ali@g', '123456');

  const logoutLink = screen.getByTestId('logout');
  fireEvent.click(logoutLink);
});
