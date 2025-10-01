import React from 'react';
import { render } from '../../test-utils';
import UnderDevelopment from '../UnderDevelopment';

describe('UnderDevelopment', () => {
  it('renders without crashing', () => {
    render(<UnderDevelopment />);
  });
});
