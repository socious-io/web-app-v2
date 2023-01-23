import { ChangeEvent, useState } from 'react';
import { Avatar } from '../../atoms/avatar/avatar';
import { Input } from '../../atoms/input/input';
import css from './send-box.module.scss';
import { SendBoxProps } from './send-box.types';

export const SendBox = (props: SendBoxProps): JSX.Element => {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    props.onValueChange(e.target.value);
  }

  return (
    <div className={css.container}>
      <Avatar size="2rem" img={props.img} type="users" />
      <Input
        onChange={onChange}
        style={{ background: '--var(--color-off-white-01)' }}
        placeholder="Write a message"
        variant="outline"
      />
      <div onClick={props.onSend} className={css.sendIcon}>
        <img src="/icons/send-white.svg" />
      </div>
    </div>
  );
};
