import css from './radio.module.scss';
import { RadioProps } from './radio.types';

export const Radio = (props: RadioProps) => {
    const { label, name, id, checked, value, onChange } = props;

    return (
        <div className={css.container}>
            <input type="radio"
                value={value}
                id={id}
                onChange={onChange}
                name={name}
                checked={checked} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};