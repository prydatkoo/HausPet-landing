import React from 'react';
import { render } from '../../test-utils';
import PreOrder from '../PreOrder';

describe('PreOrder', () => {
  it('renders without crashing', () => {
    render(<PreOrder />);
  });
});
