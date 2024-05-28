import { InputBase } from '@mui/material';
import React, { useState } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import CustomEmojiPicker from 'src/Nowruz/modules/general/components/EmojiPicker';

import css from './index.module.scss';
import { SendBoxProps } from './index.types';

const SendBox: React.FC<SendBoxProps> = ({
  userImg,
  value,
  onChange,
  onEmojiSelect,
  onSend,
  name = '',
  placeholder = 'Write...',
  buttonText = 'Send',
  disabled = false,
  className = '',
}) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if ('key' in e && e.key === 'Enter') onSend();
  };

  return (
    <div className={`${css.container} ${className}`}>
      <Avatar size="2rem" img={userImg} type="users" />
      <div className="flex-1 flex flex-col rounded-default p-3 border border-solid border-Gray-light-mode-200 emoji-font">
        <InputBase
          name={name}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          inputProps={{ style: { padding: 0 } }}
          onKeyDown={onEnter}
        />
        <div className="w-full flex gap-4 justify-end">
          <Icon
            name="face-smile"
            fontSize={24}
            className="text-Gray-light-mode-500"
            cursor="pointer"
            onClick={() => setOpenEmojiPicker(true)}
          />
          {/* <div className={css.file}>
            <Icon name="image-03" fontSize={24} className="text-Gray-light-mode-500" cursor="pointer" />
            <input id="file" name="file" type="file" />
          </div> */}
          <Button color="primary" onClick={onSend}>
            {buttonText}
          </Button>
        </div>
      </div>
      {openEmojiPicker && (
        <CustomEmojiPicker
          open={openEmojiPicker}
          handleClose={() => setOpenEmojiPicker(false)}
          onEmojiSelect={value => {
            onEmojiSelect(value.native);
            setOpenEmojiPicker(false);
          }}
          customStyle="sm:left-24 rounded-none rounded-t-lg"
        />
      )}
    </div>
  );
};

export default SendBox;
