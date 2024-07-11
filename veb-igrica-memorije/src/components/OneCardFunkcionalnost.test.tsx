import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import OneCard from './OneCard';
import { CardProps } from '../models/cardProps';

describe('OneCard Functionality', () => {
  it('should flip the card when clicked', () => {
    const mockFlipCard = vi.fn();
    const props: CardProps = {
      id: 1,
      isFlipped: false,
      isMatched: false,
      flipCard: mockFlipCard,
      uid: 1
    };

    render(<OneCard {...props} />);

    const cardContainer = screen.getByTestId('card-container');
    fireEvent.click(cardContainer);

    expect(mockFlipCard).toHaveBeenCalledWith(1, false);
  });
});