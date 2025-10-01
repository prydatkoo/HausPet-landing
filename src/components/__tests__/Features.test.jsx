import React from 'react';
import { render } from '../../test-utils';
import Features from '../Features';

describe('Features', () => {
  it('renders without crashing', () => {
    render(<Features />);
  });
});
