import React from 'react';
import { render } from '../../test-utils';
import EarlyAccess from '../EarlyAccess';

describe('EarlyAccess', () => {
  it('renders without crashing', () => {
    render(<EarlyAccess />);
  });
});
