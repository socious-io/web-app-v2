import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('setValue', () => {
    test('should set value of control on form.controls.name.setValue(value)', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = { firstName: { initialValue: 'sajad' } };
            const form = useForm(model);

            return (
                <>
                    <input type="text" {...form.bind('firstName')} />
                    <button
                        type="button"
                        onClick={() => form.controls.firstName.setValue('sara')}
                    >
                        set value to sara
                    </button>
                </>
            );
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        await userEvent.click(button);

        await waitFor(() => {
            expect(textbox).toHaveValue('sara');
        });
    });
});
