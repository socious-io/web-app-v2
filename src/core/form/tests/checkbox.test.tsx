import { render, screen, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('checkbox', () => {
    test('should set "form.control.value" to given defaultValue', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const { controls } = hook.result.current;

        expect(controls.single.value).toBe(true);
    });

    test('should set "defaultChecked={}" to given defaultValue of formModel', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = <input type="checkbox" {...bind('single')} />;

        expect(props.defaultChecked).toBe(true);
    });

    test('should set "<input defaultChecked={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            single: true,
        };

        const hook = renderHook(() => useForm(formModel));
        const { controls } = hook.result.current;

        expect(controls.single.value).toBe(true);
    });

    test('should update "form.control.value" on onChange event', () => {
        const formModel: FormModel = {
            single: false,
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls, bind } = hook.result.current;

        const change = {
            target: { checked: true, type: 'checkbox' },
        } as ChangeEvent<HTMLInputElement>;

        act(() => {
            bind('single').onChange(change);
        });

        expect(controls.single.value).toBe(true);
    });

    test.skip('should disable input on form.control.disable()', async () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: false,
                },
            };
            const { controls, bind } = useForm(formModel);

            useEffect(() => {
                controls.remember.disable();
            });

            return <input type="text" {...bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = await screen.findByRole('textbox');

        await waitFor(() => {
            expect(checkbox).toBeDisabled();
        });
    });

    test.skip('should enable input on form.control.enable()', () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: true,
                },
            };
            const { controls, bind } = useForm(formModel);

            controls.remember.enable();

            return <input type="text" {...bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = screen.getByRole('textbox');
        expect(checkbox).not.toBeDisabled();
    });

    test('should disable input when controlModel is set to disable', () => {
        const Comp = (): JSX.Element => {
            const formModel = {
                remember: {
                    initialValue: false,
                    disabled: true,
                },
            };
            const { bind } = useForm(formModel);

            return <input type="checkbox" {...bind('remember')} />;
        };

        render(<Comp />);

        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeDisabled();
    });

    test.todo(
        'should set "controls.name.value" and "checked state" to given value on "controls.name.setValue(value)"'
    );
});
