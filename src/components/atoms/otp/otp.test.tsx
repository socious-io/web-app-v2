import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Otp } from './otp';

describe('Otp', () => {
  test('should generate boxes based on given length', () => {
    render(<Otp length={6} />);
    const boxes = screen.getAllByRole('textbox');
    expect(boxes.length).toBe(6);
  });

  test('should call given onChange function when value changes', () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<Otp length={6} onChange={onChange} />);
    const boxes = screen.getAllByRole('textbox');

    user.type(boxes[0], '1234');

    expect(onChange).toHaveBeenLastCalledWith('1234');
  });
});
