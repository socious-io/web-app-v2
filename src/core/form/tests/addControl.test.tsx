import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { generateChangeEvent } from './test.helper';

describe('addControl', () => {
    test('should add one control to form based on given model', () => {
        const model: FormModel = {
            firstName: { initialValue: 'sajad' },
        };
        const form = renderHook(() => useForm(model)).result.current;

        const newModel: FormModel = {
            lastName: { initialValue: 'abbasi', disabled: true },
        };

        form.add(newModel);

        const expectedControl = {
            value: 'abbasi',
            isDisabled: true,
            isTouched: false,
            isDirty: false,
            errors: {},
        };

        expect(form.controls.lastName).toMatchObject(expectedControl);
    });

    test('should bind jsx to newly created control', () => {
        const Comp = (): JSX.Element => {
            const form = useForm({ firstName: { initialValue: 'sajad' } });

            form.add({ lastName: { initialValue: 'abbasi', disabled: true } });

            return <input type="text" {...form.bind('lastName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox') as HTMLInputElement;

        expect(textbox).toMatchObject({ value: 'abbasi', disabled: true });
    });

    test('should update value of newly created control on onChange event', () => {
        const form = renderHook(() => useForm({})).result.current;

        form.add({ lastName: { initialValue: 'abbasi' } });

        act(() => {
            const change = generateChangeEvent('kaveh');
            form.bind('lastName').onChange(change);
        });

        expect(form.controls.lastName.value).toBe('kaveh');
    });

    test.todo(
        'should disable newly created control on form.controls.newControl.disable()'
    );
});
