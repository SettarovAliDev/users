import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import 'jest-styled-components';

import Spinner from '../components/spinner/Spinner';

afterEach(cleanup);

it('renders spinner', () => {
  const tree = renderer.create(<Spinner size="7rem" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders big spinner', () => {
  const tree = renderer.create(<Spinner size="7rem" big />).toJSON();
  expect(tree).toMatchSnapshot();
});
