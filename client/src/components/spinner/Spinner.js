import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './SpinnerStyles';

const Spinner = ({ size, big }) => {
  return (
    <SpinnerOverlay data-testid="spinner" big={big}>
      <SpinnerContainer size={size} />
    </SpinnerOverlay>
  );
};

export default Spinner;
