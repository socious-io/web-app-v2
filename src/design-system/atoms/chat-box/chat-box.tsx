import css from './chat-box.module.scss';
import { CSSProperties } from 'react';
import { ChatBoxProps } from './chat-box.types';

export const ChatBox = (props: ChatBoxProps): JSX.Element => {
  const { type, children, ...rest } = props;

  function setStyle(type: ChatBoxProps['type']): CSSProperties {
    switch (type) {
      case 'receiver':
        return {
          backgroundColor: 'var(--color-off-white-01)',
          borderRadius: '0px 12px 12px 12px',
        };
      case 'sender':
        return {
          backgroundColor: 'var(--color-secondary-light)',
          borderRadius: '12px 12px 0px 12px',
        };
    }
  }

  return (
    <div style={setStyle(type)} className={css.container}>
      {children}
    </div>
  );
};
