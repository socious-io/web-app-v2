import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImpactBarSimple } from './impact-bar-simple';
import '@testing-library/jest-dom';

describe('impact-bar-simple', () => {
  test(`should set transform value to 'translateX(calc(-100% + 0.75rem))' when current equals 50`, () => {
    render(<ImpactBarSimple start={0} end={100} current={50} />);
    const element = screen.getByRole('progressbar').firstChild;
    expect(element).toHaveStyle('transform: translateX(-50%)');
  });

  test(`should set transform value to 'translateX(calc(0%))' when current equals 0`, () => {
    render(<ImpactBarSimple start={0} end={100} current={0} />);
    const element = screen.getByRole('progressbar').firstChild;
    expect(element).toHaveStyle('transform: translateX(calc(-100% + 0.75rem))');
  });

  test(`should set transform value to 'translateX(calc(0%))' when current is greater than end value`, () => {
    render(<ImpactBarSimple start={0} end={100} current={101} />);
    const element = screen.getByRole('progressbar').firstChild;
    expect(element).toHaveStyle('transform: translateX(calc(0%))');
  });

  test(`should set transform value to 'translateX(calc(-100% + 0.75rem))' when current is less than start value`, () => {
    render(<ImpactBarSimple start={0} end={100} current={-1} />);
    const element = screen.getByRole('progressbar').firstChild;
    expect(element).toHaveStyle('transform: translateX(calc(-100% + 0.75rem))');
  });
});
