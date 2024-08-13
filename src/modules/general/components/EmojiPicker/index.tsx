import EmojiPicker from '@emoji-mart/react';
import React, { useRef } from 'react';
import useDetectOutside from 'src/core/hooks/detectOutside';

import { EmojiPickerProps } from './index.types';

const CustomEmojiPicker: React.FC<EmojiPickerProps> = ({
  open,
  handleClose,
  onEmojiSelect,
  theme = 'light',
  previewPosition = 'none',
  customStyle = '',
}) => {
  const emojiPicker = useRef<HTMLDivElement>(null);
  useDetectOutside(emojiPicker, handleClose);
  return (
    <div
      ref={emojiPicker}
      className={`max-w-[358px] max-h-[300px] overflow-y-auto absolute bottom-0 left-0 z-10 border border-solid border-Gray-light-mode-200 rounded-lg ${customStyle}`}
    >
      <EmojiPicker open={open} theme={theme} previewPosition={previewPosition} onEmojiSelect={onEmojiSelect} />
    </div>
  );
};

export default CustomEmojiPicker;
