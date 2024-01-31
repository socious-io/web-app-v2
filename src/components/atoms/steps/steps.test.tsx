import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Steps } from './steps';

describe('Steps', () => {
  test('should generate steps based on given "total" prop', () => {
    render(<Steps current={1} length={4} />);
    const steps = screen.getAllByTestId('step');
    expect(steps.length).toBe(4);
  });

  test('should set proper background color to the selected step', () => {
    render(<Steps current={2} length={5} />);
    const steps = screen.getAllByTestId('step');
    expect(steps[1]).toHaveClass('active');
  });

  test('should set execute onStepClick', async () => {
    const user = userEvent.setup();
    const stepClick = jest.fn();

    render(<Steps current={2} length={5} onStepClick={stepClick} />);
    const steps = screen.getAllByTestId('step');
    await user.click(steps[2]);

    expect(stepClick).toHaveBeenCalledWith(3);
  });
});
