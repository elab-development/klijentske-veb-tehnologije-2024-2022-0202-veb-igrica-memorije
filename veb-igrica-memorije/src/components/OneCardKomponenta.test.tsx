import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import OneCard from './OneCard';
import { CardProps } from '../models/cardProps';

describe('OneCard Komponenta', () => {
  it('Proverava da li komponenta ispravno renderuje slike kartica.', () => {
    const props: CardProps = {
      id: 1,
      isFlipped: false,
      isMatched: false,
      flipCard: vi.fn(),
      uid: 1
    };

    render(<OneCard {...props} />);

    const frontImage = screen.getByAltText('card-front');
    const backImage = screen.getByAltText('card-back');

    expect(frontImage).toBeInTheDocument();
    expect(backImage).toBeInTheDocument();
  });
});