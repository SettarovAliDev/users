import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
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

export const usersData = [
  {
    id: 9,
    username: 'ali',
    email: 'ali@g',
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
          userId: 9,
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
          userId: 9,
        },
      },
    ],
    profiles: [
      {
        id: 17,
        name: 'das',
        gender: 'male',
        birthdate: '2021-12-07T16:27:12.000Z',
        city: 'das',
        createdAt: '2021-12-09T16:27:15.476Z',
        updatedAt: '2021-12-09T16:27:15.476Z',
        user_profiles: {
          createdAt: '2021-12-09T16:27:15.659Z',
          updatedAt: '2021-12-09T16:27:15.659Z',
          profileId: 17,
          userId: 9,
        },
      },
    ],
  },
  {
    id: 10,
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
          userId: 10,
        },
      },
    ],
    profiles: [
      {
        id: 18,
        name: 'sadda',
        gender: 'male',
        birthdate: '',
        city: 'dsa',
        createdAt: '2021-12-09T16:34:28.981Z',
        updatedAt: '2021-12-09T16:34:28.981Z',
        user_profiles: {
          createdAt: '2021-12-09T16:34:29.152Z',
          updatedAt: '2021-12-09T16:34:29.152Z',
          profileId: 18,
          userId: 10,
        },
      },
      {
        id: 19,
        name: 'dssddd',
        gender: 'male',
        birthdate: '2021-12-08T16:36:57.000Z',
        city: 'fdsfs',
        createdAt: '2021-12-09T16:37:00.369Z',
        updatedAt: '2022-01-04T19:29:56.370Z',
        user_profiles: {
          createdAt: '2021-12-09T16:37:00.983Z',
          updatedAt: '2021-12-09T16:37:00.983Z',
          profileId: 19,
          userId: 10,
        },
      },
      {
        id: 20,
        name: 'dadadadd',
        gender: 'male',
        birthdate: '2021-12-13T22:00:00.000Z',
        city: 'dasdada',
        createdAt: '2021-12-09T16:37:44.728Z',
        updatedAt: '2021-12-10T09:23:34.452Z',
        user_profiles: {
          createdAt: '2021-12-09T16:37:45.310Z',
          updatedAt: '2021-12-09T16:37:45.310Z',
          profileId: 20,
          userId: 10,
        },
      },
      {
        id: 22,
        name: 'dsad',
        gender: 'male',
        birthdate: '2021-12-02T09:23:42.000Z',
        city: 'sssssssssssssssssssssssssssss',
        createdAt: '2021-12-10T09:23:44.934Z',
        updatedAt: '2021-12-10T09:23:44.934Z',
        user_profiles: {
          createdAt: '2021-12-10T09:23:45.488Z',
          updatedAt: '2021-12-10T09:23:45.488Z',
          profileId: 22,
          userId: 10,
        },
      },
    ],
  },
  {
    id: 11,
    username: 'fgh',
    email: 'fgh@fgh',
    password: '$2a$08$MD/l42lgF2Mo4NolEt55z.Wg8Ep2MYWEkbP5fs9.c9uzil8dCnuiW',
    createdAt: '2021-12-27T18:46:38.612Z',
    updatedAt: '2021-12-27T18:46:38.612Z',
    roles: [
      {
        id: 1,
        name: 'user',
        createdAt: '2021-12-09T13:58:09.968Z',
        updatedAt: '2021-12-09T13:58:09.968Z',
        user_roles: {
          createdAt: '2021-12-27T18:46:38.797Z',
          updatedAt: '2021-12-27T18:46:38.797Z',
          roleId: 1,
          userId: 11,
        },
      },
      {
        id: 2,
        name: 'admin',
        createdAt: '2021-12-09T13:58:09.969Z',
        updatedAt: '2021-12-09T13:58:09.969Z',
        user_roles: {
          createdAt: '2021-12-27T18:46:38.797Z',
          updatedAt: '2021-12-27T18:46:38.797Z',
          roleId: 2,
          userId: 11,
        },
      },
    ],
    profiles: [
      {
        id: 25,
        name: 'shsdh',
        gender: 'male',
        birthdate: '0020-12-15T21:57:56.000Z',
        city: '4221',
        createdAt: '2021-12-27T18:48:07.456Z',
        updatedAt: '2021-12-27T18:48:31.991Z',
        user_profiles: {
          createdAt: '2021-12-27T18:48:07.637Z',
          updatedAt: '2021-12-27T18:48:07.637Z',
          profileId: 25,
          userId: 11,
        },
      },
    ],
  },
  {
    id: 12,
    username: 'alina',
    email: 'alina@g',
    password: '$2a$08$p1SjDvWW06BIs.TnBPtNNunoOAXaNItrTkpuYl1LlhEks5dVhIdm2',
    createdAt: '2022-01-04T19:24:54.475Z',
    updatedAt: '2022-01-04T19:25:55.714Z',
    roles: [
      {
        id: 1,
        name: 'user',
        createdAt: '2021-12-09T13:58:09.968Z',
        updatedAt: '2021-12-09T13:58:09.968Z',
        user_roles: {
          createdAt: '2022-01-04T19:24:54.683Z',
          updatedAt: '2022-01-04T19:24:54.683Z',
          roleId: 1,
          userId: 12,
        },
      },
      {
        id: 2,
        name: 'admin',
        createdAt: '2021-12-09T13:58:09.969Z',
        updatedAt: '2021-12-09T13:58:09.969Z',
        user_roles: {
          createdAt: '2022-01-04T19:24:54.683Z',
          updatedAt: '2022-01-04T19:24:54.683Z',
          roleId: 2,
          userId: 12,
        },
      },
    ],
    profiles: [
      {
        id: 28,
        name: 'dsadsadd',
        gender: 'male',
        birthdate: '2022-01-02T22:00:00.000Z',
        city: 'dsada',
        createdAt: '2022-01-04T19:26:52.687Z',
        updatedAt: '2022-01-04T19:26:58.329Z',
        user_profiles: {
          createdAt: '2022-01-04T19:26:52.872Z',
          updatedAt: '2022-01-04T19:26:52.872Z',
          profileId: 28,
          userId: 12,
        },
      },
      {
        id: 30,
        name: 'dfds',
        gender: 'male',
        birthdate: '2022-01-02T19:12:09.000Z',
        city: 'fdsfds',
        createdAt: '2022-01-06T19:12:13.983Z',
        updatedAt: '2022-01-06T19:12:13.983Z',
        user_profiles: {
          createdAt: '2022-01-06T19:12:14.663Z',
          updatedAt: '2022-01-06T19:12:14.663Z',
          profileId: 30,
          userId: 12,
        },
      },
      {
        id: 31,
        name: 'gfdgfdgg',
        gender: 'male',
        birthdate: '2021-12-07T19:12:20.000Z',
        city: 'fxgd',
        createdAt: '2022-01-06T19:12:30.923Z',
        updatedAt: '2022-01-06T19:12:40.105Z',
        user_profiles: {
          createdAt: '2022-01-06T19:12:31.558Z',
          updatedAt: '2022-01-06T19:12:31.558Z',
          profileId: 31,
          userId: 12,
        },
      },
      {
        id: 32,
        name: 'dsad',
        gender: 'male',
        birthdate: '2022-01-04',
        city: 'dsadsa',
        createdAt: '2022-01-06T19:15:47.913Z',
        updatedAt: '2022-01-06T19:15:47.913Z',
        user_profiles: {
          createdAt: '2022-01-06T19:15:49.315Z',
          updatedAt: '2022-01-06T19:15:49.315Z',
          profileId: 32,
          userId: 12,
        },
      },
      {
        id: 33,
        name: 'sdfsfd',
        gender: 'female',
        birthdate: '2022-01-17',
        city: 'fdsfsfs',
        createdAt: '2022-01-06T19:15:57.583Z',
        updatedAt: '2022-01-06T19:15:57.583Z',
        user_profiles: {
          createdAt: '2022-01-06T19:15:57.778Z',
          updatedAt: '2022-01-06T19:15:57.778Z',
          profileId: 33,
          userId: 12,
        },
      },
      {
        id: 34,
        name: 'fdsfs',
        gender: 'male',
        birthdate: '2022-01-21',
        city: 'fdsfds',
        createdAt: '2022-01-06T19:16:18.722Z',
        updatedAt: '2022-01-06T19:16:18.722Z',
        user_profiles: {
          createdAt: '2022-01-06T19:16:20.420Z',
          updatedAt: '2022-01-06T19:16:20.420Z',
          profileId: 34,
          userId: 12,
        },
      },
      {
        id: 35,
        name: 'dgdfg',
        gender: 'female',
        birthdate: '1997-02-11',
        city: 'gfdgfd',
        createdAt: '2022-01-06T19:17:03.488Z',
        updatedAt: '2022-01-06T19:17:03.488Z',
        user_profiles: {
          createdAt: '2022-01-06T19:17:04.171Z',
          updatedAt: '2022-01-06T19:17:04.171Z',
          profileId: 35,
          userId: 12,
        },
      },
    ],
  },
];
