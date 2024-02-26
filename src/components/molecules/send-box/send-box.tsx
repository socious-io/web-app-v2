import { ChangeEvent } from 'react';

import css from './send-box.module.scss';
import { SendBoxProps } from './send-box.types';
import { Input } from '../../atoms/input/input';

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

  const enterInput = (e: any) => {
    if (e.key === 'Enter') {
      props.onSend();
    }
  };

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
        onKeyDown={((e) => enterInput(e))}
      />
      <div style={setStyle()} onClick={props.onSend} className={css.sendIcon}>
        <img src="/icons/send-blue.svg" />
      </div>
    </div>
  );
};
