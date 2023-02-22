import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from '../useForm/useForm';
import { FormModel, JSXBinding } from '../useForm/useForm.types';

const selectOption = (jsx: JSXBinding): JSX.Element => {
    return (
        <select name="pets" {...jsx}>
            <option value="">--Please choose an option--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
            <option value="sale">Sale</option>
        </select>
    );
};

const SelectOptionComp = (prop: { model: FormModel }): JSX.Element => {
    const form = useForm(prop.model);

    return { ...selectOption(form.bind('category')) };
};

describe('select', () => {
    test('should set selected value to initialValue of formModel', () => {
        const model: FormModel = {
            category: {
                initialValue: 'sale',
            },
        };
        render(<SelectOptionComp model={model} />);

        const combobox = screen.getByRole('combobox');

        expect(combobox).toHaveDisplayValue('Sale');
    });

    test('should disable when model initial value is set to disabled', () => {
        const model: FormModel = {
            category: {
                initialValue: 'sale',
                disabled: true,
            },
        };

        render(<SelectOptionComp model={model} />);

        const combobox = screen.getByRole('combobox');

        expect(combobox).toBeDisabled();
    });

    test('should set value of combobox on controls.name.setValue(value)', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = {
                category: {
                    initialValue: 'sale',
                    disabled: true,
                },
            };
            const form = useForm(model);

            return (
                <>
                    <select name="pets" {...form.bind('category')}>
                        <option value="">--Please choose an option--</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="goldfish">Goldfish</option>
                        <option value="sale">Sale</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => form.controls.category.setValue('spider')}
                    >
                        set value to spider
                    </button>
                </>
            );
        };

        render(<Comp />);
        // TODO: read about setup on https://testing-library.com/docs/user-event/setup
        const user = userEvent.setup();

        const combobox = screen.getByRole('combobox');
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() => {
            expect(combobox).toHaveDisplayValue('Spider');
        });
    });
});
