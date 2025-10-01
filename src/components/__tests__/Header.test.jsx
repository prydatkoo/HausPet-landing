import React from 'react';
import { render, screen } from '../../test-utils';
import Header from '../Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('HausPet Logo');
    expect(logo).toBeInTheDocument();
  });
});
