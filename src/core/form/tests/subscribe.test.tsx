/* eslint-disable react/button-has-type */
import { renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe.skip('subscribe', () => {
    test('should call subscribe with given value on "controls.name.setValue(value)"', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        const mockCallback = jest.fn();

        form.controls.firstName.subscribe(mockCallback);

        const change = { target: { value: 'sara' } } as ChangeEvent<HTMLInputElement>;
        form.bind('firstName').onChange(change);

        expect(mockCallback).toBeCalled();
    });

    test('should subscribe to more than one subscribe method', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        const mockCallback1 = jest.fn((x) => x + 1);
        const mockCallback2 = jest.fn((x) => x + 2);

        form.controls.firstName.subscribe(mockCallback1);
        form.controls.firstName.subscribe(mockCallback2);

        const change = { target: { value: 'sara' } } as ChangeEvent<HTMLInputElement>;
        form.bind('firstName').onChange(change);

        expect(mockCallback1).toBeCalled();
        expect(mockCallback2).toBeCalled();
    });

    test.todo('should not re-create callback on each render');
});
