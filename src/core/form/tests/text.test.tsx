/* eslint-disable react/button-has-type */
import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FormChangeEvent, FormModel } from '../useForm/useForm.types';
import { useForm } from '../useForm/useForm';

describe('text', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            firstName: { initialValue: 'sajad' },
        };

        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = <input type="text" {...bind('firstName')} />;
        expect(props.defaultValue).toBe('sajad');
    });

    test('should set "<input defaultValue={}>" to the given value in FormModel', () => {
        const formModel: FormModel = {
            firstName: 'sara',
        };

        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = <input type="text" {...bind('firstName')} />;
        expect(props.defaultValue).toBe('sara');
    });

    test('should set controls.firstName.value to defaultValue given in model', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls } = hook.result.current;

        expect(controls.firstName.value).toBe('sajad');
    });

    test('should update form.value on onChange event', () => {
        const formModel: FormModel = {
            firstName: '',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls, bind } = hook.result.current;

        act(() => {
            const change = { target: { value: 'sara' } } as ChangeEvent<HTMLInputElement>;
            bind('firstName').onChange(change);
        });

        expect(controls.firstName.value).toBe('sara');
    });

    test.skip('should disable input on form.control.disable()', async () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: '',
            };
            const { controls, bind } = useForm(formModel);

            return (
                <>
                    <input type="text" {...bind('firstName')} />
                    <button onClick={() => controls.firstName.disable()}>disable</button>
                </>
            );
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        await userEvent.click(button);

        expect(textbox).toBeDisabled();
    });

    test.skip('should enable input on form.control.enable()', () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: {
                    initialValue: '',
                    disabled: true,
                },
            };
            const { controls, bind } = useForm(formModel);
            controls.firstName.enable();

            return <input type="text" {...bind('firstName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        expect(textbox).not.toBeDisabled();
    });

    test('should disable input when controlModel is set to disable', () => {
        const Comp = (): JSX.Element => {
            const formModel: FormModel = {
                firstName: {
                    initialValue: '',
                    disabled: true,
                },
            };
            const { bind } = useForm(formModel);

            return <input {...bind('firstName')} />;
        };

        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        expect(textbox).toBeDisabled();
    });

    test('should set form.control.isTouched to true on blur event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls, bind } = hook.result.current;

        act(() => {
            const onBlueEvent = (): boolean => true;
            bind('firstName').onBlur(onBlueEvent as unknown as FormChangeEvent);
        });

        expect(controls.firstName.isTouched).toBe(true);
    });

    test('should set form.control.isDirty to true on input change event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls, bind } = hook.result.current;

        act(() => {
            const change = {
                target: { value: 'newValue' },
            } as ChangeEvent<HTMLInputElement>;
            bind('firstName').onChange(change);
        });

        expect(controls.firstName.isDirty).toBe(true);
    });

    test('should set form.isTouched to true on any blur event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const form = renderHook(() => useForm(formModel)).result.current;

        act(() => {
            const onBlueEvent = (): boolean => true;
            form.bind('firstName').onBlur(onBlueEvent as unknown as FormChangeEvent);
        });

        expect(form.isTouched).toBe(true);
    });

    test('should set form.isDirty to true on any input change event', () => {
        const formModel: FormModel = {
            firstName: 'sajad',
        };
        const form = renderHook(() => useForm(formModel)).result.current;

        act(() => {
            const change = {
                target: { value: 'newValue' },
            } as ChangeEvent<HTMLInputElement>;
            form.bind('firstName').onChange(change);
        });

        expect(form.isDirty).toBe(true);
    });

    test('should render proper value after controls.name.setValue(value) to input', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = { firstName: 'sajad' };

            const form = useForm(model);

            return (
                <div>
                    <input type="text" {...form.bind('firstName')} />
                    <button
                        type="submit"
                        onClick={() => form.controls.firstName.setValue('sara')}
                    >
                        submit
                    </button>
                </div>
            );
        };
        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        expect(textbox).toHaveValue('sajad');

        await userEvent.click(button);

        expect(textbox).toHaveValue('sara');
    });

    test.skip('should disable input given a disabled model', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = { firstName: 'sajad', disabled: true };

            const form = useForm(model);

            return <input {...form.bind('firstName')} />;
        };
        render(<Comp />);

        const textbox = screen.getByRole('textbox');

        expect(textbox).toBeDisabled();
    });

    test.skip('should disable and rerender input after controls.name.disable()', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = { firstName: 'sajad' };

            const form = useForm(model);

            return (
                <div>
                    <input {...form.bind('firstName')} />
                    <button
                        type="submit"
                        onClick={() => form.controls.firstName.disable()}
                    >
                        submit
                    </button>
                </div>
            );
        };
        render(<Comp />);

        const textbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        expect(textbox).toBeEnabled();

        await userEvent.click(button);

        expect(textbox).toBeDisabled();
    });
});
