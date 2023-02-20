import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = (props: InputProps): JSX.Element => {
  const { optional = false, register, errors = [], variant = 'outline', ...rest } = props;

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (props.label) {
    return (
      <div className={`${setClassName(variant)} ${props.className}`}>
        <label className={css.label} htmlFor={props.label}>
          {optional ? (
            <div>
              {props.label} <span className={css.optionalLabel}>(optional)</span>
            </div>
          ) : (
            props.label
          )}
        </label>
        <input
          id={props.label}
          className={css.textbox}
          role="textbox"
          {...rest}
          {...register?.(props.name, { required: !optional, ...props.validations })}
        ></input>
        <div className={css.errorsContainer}>
          {errors.map((error, i) => {
            return (
              <div className={css.errorItem} key={i}>
                {error}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ gridTemplateRows: '2.5rem' }} className={`${setClassName(variant)} ${props.className}`}>
      <input
        id={props.label}
        className={css.textbox}
        role="textbox"
        {...rest}
        {...register?.(props.name, { required: !optional, ...props.validations })}
      ></input>
    </div>
  );
};
