import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { pattern } from '../../useForm/validations';

describe('validations - pattern', () => {
    test('should set form.control.isValid to false when regex is incorrect', () => {
        const model: FormModel = {
            cellphone: {
                initialValue: 'zero 913',
                validators: [pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { controls } = hook.result.current;

        expect(controls.cellphone.isValid).toBe(false);
    });

    test('should set form.control.isValid to true when regex is correct', () => {
        const model: FormModel = {
            cellphone: {
                initialValue: '9136868075',
                validators: [pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { controls } = hook.result.current;

        expect(controls.cellphone.isValid).toBe(true);
    });
});
