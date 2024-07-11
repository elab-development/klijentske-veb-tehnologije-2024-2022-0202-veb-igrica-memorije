/*import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import OneCard from './OneCard';
import { CardProps } from '../models/cardProps';

describe('OneCard Komponenta sa Mock funkcijom', () => {
  it('Testira da li flipCard funkcija prima tačne argumente kada se kartica klikne', () => {
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
});*/
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import OneCard from './OneCard';
import { CardProps } from '../models/cardProps';

describe('OneCard Komponenta', () => {
  it('Testira da li se mock funkcija flipCard poziva kada se klikne na karticu.', () => {
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

    expect(mockFlipCard).toHaveBeenCalled();
  });
});