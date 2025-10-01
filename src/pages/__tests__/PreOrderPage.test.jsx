import React from 'react';
import { render } from '../../test-utils';
import PreOrderPage from '../PreOrderPage';

describe('PreOrderPage', () => {
  it('renders without crashing', () => {
    render(<PreOrderPage />);
  });
});
