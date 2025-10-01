import React from 'react';
import { render, screen } from '../../test-utils';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('HausPet Logo');
    expect(logo).toBeInTheDocument();
  });
});
