import css from './modal.module.scss';
import { CSSProperties, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from 'src/hooks/use-scroll-lock';
import { ModalProps } from './modal.types';

const modalPlaceholder = document.querySelector('#modal-placeholder') as HTMLDivElement;
const transitionDuration = 180;

export const Modal = (props: ModalProps): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock();
  props.open ? lockScroll() : unlockScroll();

  const initialStyle: CSSProperties = {
    width: props.width,
    height: props.height,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
  };

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    transition: `all ${transitionDuration}ms 0ms`,
    zIndex: props.zIndex,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (props.open) {
      setContainerStyle((style) => ({ ...style, opacity: 1, visibility: 'visible' }));
    } else {
      timer = setTimeout(() => {
        setContainerStyle((style) => ({ ...style, opacity: 0, visibility: 'hidden' }));
        unlockScroll();
      }, transitionDuration);
    }
    return () => {
      timer?.unref?.();
    };
  }, [props.open]);

  const jsx = (
    <div id="modal-box" onClick={props.onClose} className={css.container} style={containerStyle}>
      <div style={initialStyle} onClick={(e) => e.stopPropagation()} className={css.content}>
        {props.children}
      </div>
    </div>
  );

  return createPortal(jsx, modalPlaceholder);
};
