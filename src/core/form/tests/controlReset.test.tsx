import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { generateChangeEvent } from './test.helper';

describe('controlReset', () => {
    test('should regenerate control', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        const originalControl = JSON.stringify(form.controls.firstName);

        const change = generateChangeEvent('sajad');

        act(() => {
            form.bind('firstName').onChange(change);
        });

        act(() => {
            form.controls.firstName.reset();
        });

        const controlAfterReset = JSON.stringify(form.controls.firstName);

        expect(originalControl).toBe(controlAfterReset);
    });

    test.todo('should re-subscribe on control controls.name.reset()');
    test.todo('should re-evaluate validations on controls.name.reset()');
});
