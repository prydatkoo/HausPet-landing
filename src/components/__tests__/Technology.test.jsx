import React from 'react';
import { render } from '../../test-utils';
import Technology from '../Technology';

describe('Technology', () => {
  it('renders without crashing', () => {
    render(<Technology />);
  });
});
