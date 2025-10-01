import React from 'react';
import { render } from '../../test-utils';
import FloatingContact from '../FloatingContact';

describe('FloatingContact', () => {
  it('renders without crashing', () => {
    render(<FloatingContact />);
  });
});
