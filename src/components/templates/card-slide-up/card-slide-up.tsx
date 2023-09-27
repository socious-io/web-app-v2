import { CSSProperties, SyntheticEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from 'src/hooks/use-scroll-lock';

import css from './card-slide-up.module.scss';
import { CardSlideProps } from './card-slide-up.types';

export const CardSlideUp = (props: CardSlideProps): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock();
  props.open ? lockScroll() : unlockScroll();
  const [state, setState] = useState(props.open);

  useEffect(() => {
    setState(props.open);
  }, [props.open]);

  function onClose(e: SyntheticEvent) {
    props.onClose();
  }

  function onContentClick(e: SyntheticEvent) {
    e.stopPropagation();
  }

  const containerStyle = (): CSSProperties => {
    if (state) {
      return {
        opacity: 1,
        visibility: 'visible',
      };
    }
    return {
      opacity: 0,
      visibility: 'hidden',
    };
  };

  function contentStyle() {
    if (state) {
      return {
        transform: 'translateY(0%)',
      };
    }
    return {
      transform: 'translateY(100%)',
    };
  }

  const jsx = (
    <>
      <div style={containerStyle()} onClick={onClose} className={css.container}></div>
      <div style={contentStyle()} onClick={onContentClick} className={css.content}>
        {props.children}
      </div>
    </>
  );

  return createPortal(jsx, document.body);
};
