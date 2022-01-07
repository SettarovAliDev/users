import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store from '../store/store';

it('should render Provider with real store', () => {
  render(<Provider store={store}></Provider>);
});
