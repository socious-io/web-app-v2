import { useRef, KeyboardEvent, MutableRefObject, useCallback, useEffect } from 'react';
import css from './otp.module.scss';
import { OtpProps } from './otp.types';

export const Otp = (props: OtpProps): JSX.Element => {
  const { length, disabled = false, value, onChange } = props;
  const boxesRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    boxesRef.current.forEach((box, i) => (box.value = value?.charAt(i)));
  }, [value]);

  const list = Array.from(Array(length).keys());

  const addToBoxesRef = useCallback((ref: HTMLInputElement) => {
    ref && boxesRef.current.push(ref);
  }, []);

  function focusNext(boxNo: number, value: string) {
    boxesRef.current[boxNo - 1].value = value;
    const nextBox = boxesRef.current[boxNo];
    nextBox?.focus();
  }

  function focusPrev(boxNo: number) {
    boxesRef.current[boxNo].value = '';
    const prevBox = boxesRef.current[boxNo - 1];
    prevBox?.focus();
  }

  function isValid(value: string): boolean {
    const isNumber = isNaN(Number(value));
    return isNumber || value === '' ? false : true;
  }

  function reset(): void {
    boxesRef.current.forEach((ref) => (ref.value = ''));
    boxesRef.current[0].focus();
  }

  function getValue(boxesRef: MutableRefObject<HTMLInputElement[]>) {
    return boxesRef.current.map((el) => el.value).join('');
  }

  function onKeyDown(boxNo: number) {
    return (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const isBackspace = e.code === 'Backspace';

      if (isBackspace) {
        focusPrev(boxNo - 1);
      }

      if (isValid(e.key)) {
        focusNext(boxNo, e.key);
      }

      const otpValue = getValue(boxesRef);
      onChange?.(otpValue);
    };
  }

  return (
    <div className={css.container}>
      {list.map((i) => (
        <input
          disabled={disabled}
          onKeyDown={onKeyDown(i + 1)}
          ref={addToBoxesRef}
          className={css.box}
          key={i}
          role="textbox"
          type="number"
          pattern="[0-9]*"
          maxLength={1}
        />
      ))}
    </div>
  );
};
