import { ChangeEvent } from 'react';
import { Input } from '../../atoms/input/input';
import css from './send-box.module.scss';
import { SendBoxProps } from './send-box.types';

export const SendBox = (props: SendBoxProps): JSX.Element => {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    props.onValueChange?.(e.target.value);
  }

  function setStyle() {
    if (props.value) {
      return { opacity: '1' };
    }
    return { opacity: '0.5' };
  }

  return (
    <div className={`${css.container} ${props.className}`}>
      {/* <Avatar size="2rem" img={props.img} type="users" /> */}
      <Input
        value={props.value}
        onChange={onChange}
        style={{ background: '--var(--color-off-white-01)' }}
        placeholder="Write a message"
        variant="outline"
        disabled={props.disabled}
      />
      <div style={setStyle()} onClick={props.onSend} className={css.sendIcon}>
        <img src="/icons/send-blue.svg" />
      </div>
    </div>
  );
};
