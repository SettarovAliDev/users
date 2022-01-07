import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PageNotFound from '../pages/page-not-found/PageNotFound';
import { rtlRender } from './test-utils';

it('should render PageNotFound page', () => {
  rtlRender(<PageNotFound />);

  const pageNotFoundText = screen.getByText(/page not found/i);
  expect(pageNotFoundText).toBeInTheDocument();
});
