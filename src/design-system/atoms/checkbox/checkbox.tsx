import { useState } from 'react';
import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ checked, id, label, disabled }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setIsChecked(e.currentTarget.checked);
    }

    return (
        <div className={css.container}>
            <input type="checkbox" id={id}
                checked={isChecked}
                disabled={disabled}
                onChange={onChangeHandler} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
