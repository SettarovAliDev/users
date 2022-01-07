import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { render } from '@testing-library/react';

import authSlice from '../store/authSlice';
import usersSlice from '../store/usersSlice';

export const rtlRender = (
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { auth: authSlice, users: usersSlice },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

it.skip('skip', () => {});

export const handlers = [
  rest.post('http://localhost:5000/api/auth/signin', (req, res, ctx) => {
    const isAdmin = req.body.email === 'ali@g';
    return res(
      ctx.json({
        isAdmin,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks',
        userId: isAdmin ? 1 : 2,
      }),
      ctx.delay(150)
    );
  }),

  rest.post('http://localhost:5000/api/auth/signup', (req, res, ctx) => {
    const isAdmin = req.body.roles.includes('admin');
    return res(
      ctx.json({
        isAdmin,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks',
        userId: isAdmin ? 1 : 3,
      }),
      ctx.delay(150)
    );
  }),

  rest.get('http://localhost:5000/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        isAdmin: true,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY0MTUwMTA5OCwiZXhwIjoxNjQ0MTc5NDk4fQ.HIZg_i3wVgNFXQPtnEjyfmZ6yobtjNMmNxrvgawDvks',
        userId: 1,
      }),
      ctx.delay(150)
    );
  }),

  rest.get('http://localhost:5000/api/users', (req, res, ctx) => {
    return res(ctx.json(usersData), ctx.delay(150));
  }),

  rest.get('http://localhost:5000/api/users/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.userId,
        username: 'alina',
        email: 'alina@g',
        password:
          '$2a$08$MmeqsUlgOElkGCxE3vSm2.v55e4iAAYgf650VrKb8sWXSv/KiyLtu',
        createdAt: '2022-01-07T12:59:06.871Z',
        updatedAt: '2022-01-07T12:59:06.871Z',
        roles: [
          {
            id: 1,
            name: 'user',
            createdAt: '2021-12-09T13:58:09.968Z',
            updatedAt: '2021-12-09T13:58:09.968Z',
            user_roles: {
              createdAt: '2022-01-07T12:59:07.064Z',
              updatedAt: '2022-01-07T12:59:07.064Z',
              roleId: 1,
              userId: 3,
            },
          },
        ],
        profiles: [],
      }),
      ctx.delay(150)
    );
  }),

  rest.post('http://localhost:5000/api/profiles', (req, res, ctx) => {
    const { name, gender, birthdate, city } = req.body;
    return res(
      ctx.json({
        id: 4,
        name,
        gender,
        birthdate,
        city,
        createdAt: '2022-01-07T22:38:23.801Z',
        updatedAt: '2022-01-07T22:38:23.801Z',
      }),
      ctx.delay(150)
    );
  }),

  rest.put('http://localhost:5000/api/profiles/:profileId', (req, res, ctx) => {
    const { name, gender, birthdate, city, profileId } = req.body;
    return res(
      ctx.json({
        profile: {
          id: profileId,
          name,
          gender,
          birthdate,
          city,
          createdAt: '2022-01-06T19:12:13.983Z',
          updatedAt: '2022-01-07T22:59:43.481Z',
        },
        userId: 1,
      }),
      ctx.delay(150)
    );
  }),

  rest.delete(
    'http://localhost:5000/api/profiles/:profileId',
    (req, res, ctx) => {
      return res(ctx.json(), ctx.delay(150));
    }
  ),
];

export const usersData = [
  {
    id: 1,
    username: 'ali',
    email: 'ali@gmail.com',
    password: '$2a$08$Z7X6.mezf3sYEATIZDN6hOPdBkEXXBi7brAeA6GxFqXD42QMNG2zK',
    createdAt: '2021-12-09T15:25:05.282Z',
    updatedAt: '2021-12-09T15:25:05.282Z',
    roles: [
      {
        id: 1,
        name: 'user',
        createdAt: '2021-12-09T13:58:09.968Z',
        updatedAt: '2021-12-09T13:58:09.968Z',
        user_roles: {
          createdAt: '2021-12-09T15:25:05.463Z',
          updatedAt: '2021-12-09T15:25:05.463Z',
          roleId: 1,
          userId: 1,
        },
      },
      {
        id: 2,
        name: 'admin',
        createdAt: '2021-12-09T13:58:09.969Z',
        updatedAt: '2021-12-09T13:58:09.969Z',
        user_roles: {
          createdAt: '2021-12-09T15:25:05.463Z',
          updatedAt: '2021-12-09T15:25:05.463Z',
          roleId: 2,
          userId: 1,
        },
      },
    ],
    profiles: [
      {
        id: 1,
        name: 'Settarov Ali',
        gender: 'male',
        birthdate: '1997-07-10T16:27:12.000Z',
        city: 'Kyiv',
        createdAt: '2021-12-09T16:27:15.476Z',
        updatedAt: '2021-12-09T16:27:15.476Z',
        user_profiles: {
          createdAt: '2021-12-09T16:27:15.659Z',
          updatedAt: '2021-12-09T16:27:15.659Z',
          profileId: 1,
          userId: 1,
        },
      },
      {
        id: 2,
        name: 'Ivanov Ivan',
        gender: 'male',
        birthdate: '1997-07-10T16:27:12.000Z',
        city: 'Kyiv',
        createdAt: '2021-12-09T16:27:15.476Z',
        updatedAt: '2021-12-09T16:27:15.476Z',
        user_profiles: {
          createdAt: '2021-12-09T16:27:15.659Z',
          updatedAt: '2021-12-09T16:27:15.659Z',
          profileId: 2,
          userId: 1,
        },
      },
    ],
  },
  {
    id: 2,
    username: 'settar',
    email: 'settar@g',
    password: '$2a$08$DP6UhHi2OkO5jcGkQ./x6efP2YPsht1jKcMKcjYRe5Ub8NznBTiUK',
    createdAt: '2021-12-09T16:34:19.233Z',
    updatedAt: '2021-12-09T16:34:19.233Z',
    roles: [
      {
        id: 1,
        name: 'user',
        createdAt: '2021-12-09T13:58:09.968Z',
        updatedAt: '2021-12-09T13:58:09.968Z',
        user_roles: {
          createdAt: '2021-12-09T16:34:19.411Z',
          updatedAt: '2021-12-09T16:34:19.411Z',
          roleId: 1,
          userId: 2,
        },
      },
    ],
    profiles: [
      {
        id: 3,
        name: 'Settarov Settar',
        gender: 'male',
        birthdate: '1995-10-17T16:27:12.000Z',
        city: 'Kyiv',
        createdAt: '2021-12-09T16:34:28.981Z',
        updatedAt: '2021-12-09T16:34:28.981Z',
        user_profiles: {
          createdAt: '2021-12-09T16:34:29.152Z',
          updatedAt: '2021-12-09T16:34:29.152Z',
          profileId: 3,
          userId: 2,
        },
      },
    ],
  },
];

export const normalizedUsers = {};
usersData.forEach((user) => {
  const normalizedProfiles = {};
  user.profiles.forEach((profile) => {
    normalizedProfiles[`${profile.id}`] = profile;
  });
  normalizedUsers[`${user.id}`] = {
    ...user,
    profiles: normalizedProfiles,
  };
});
