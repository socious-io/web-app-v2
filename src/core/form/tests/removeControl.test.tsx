import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('removeControl', () => {
    test('should remove one control from formGroup', () => {
        const model: FormModel = {
            firstName: { initialValue: 'sajad' },
            lastName: { initialValue: 'abbasi' },
        };
        const form = renderHook(() => useForm(model)).result.current;

        form.remove('lastName');

        expect(form.controls.lastName).toBeFalsy();
    });

    test('should remove multiple controls from formGroup', () => {
        const model: FormModel = {
            firstName: { initialValue: 'sajad' },
            lastName: { initialValue: 'abbasi' },
            age: { initialValue: 'unknown' },
        };
        const form = renderHook(() => useForm(model)).result.current;

        form.remove(['firstName', 'lastName']);

        expect(form.controls.firstName).toBeFalsy();
        expect(form.controls.lastName).toBeFalsy();
    });

    test.todo('should re-validate form on control removal');
});
