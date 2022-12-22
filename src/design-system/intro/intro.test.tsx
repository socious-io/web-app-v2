import { render } from '@testing-library/react';
import { Intro } from './intro';

describe('Intro', () => {
  test('intro page loaded', () => {
    render(<Intro />);
  });
});

export {};
