import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';
import { usersData, rtlRender } from './test-utils';

export const handlers = [
  rest.post('http://localhost:5000/api/auth/signin', (req, res, ctx) => {
    return res(
      ctx.json({
        isAdmin: true,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks',
        userId: 12,
      }),
      ctx.delay(150)
    );
  }),

  rest.get('http://localhost:5000/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        isAdmin: true,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks',
        userId: 12,
      }),
      ctx.delay(150)
    );
  }),

  rest.get('http://localhost:5000/api/users', (req, res, ctx) => {
    return res(ctx.json(usersData), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it('should render SignIn screen', () => {
  rtlRender(<App />);
});

it('should render SignUp screen', () => {
  rtlRender(<App />);

  const signUpButton = screen.getByRole('link', { name: /sign up/i });
  fireEvent.click(signUpButton);
});

it('should render app and login as admin', async () => {
  rtlRender(<App />);

  const inputEmail = screen.getByLabelText(/email/i);
  const inputPassword = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(inputEmail, {
    target: { value: 'alina@g' },
  });
  expect(inputEmail.value).toBe('alina@g');

  fireEvent.change(inputPassword, {
    target: { value: '123456' },
  });
  expect(inputPassword.value).toBe('123456');

  fireEvent.click(signInButton);
  const logOut = await screen.findByText(/log out/i);
  expect(logOut).toBeInTheDocument();
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
