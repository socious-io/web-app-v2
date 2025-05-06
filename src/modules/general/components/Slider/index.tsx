import { Capacitor } from '@capacitor/core';
import { Slide } from '@mui/material';
import React, { useRef } from 'react';
import useDetectOutside from 'src/core/hooks/detectOutside';
import { translate } from 'src/core/utils';
import { BackLink } from 'src/modules/general/components/BackLink';
import { CloseButton } from 'src/modules/general/components/closeButton';

import styles from './index.module.scss';
import { SliderProps } from './index.types';

const Slider: React.FC<SliderProps> = ({
  open,
  onClose,
  children,
  title = '',
  subtitle = '',
  direction = 'left',
  mountOnEnter = true,
  unmountOnExit = true,
  headerDivider = true,
  containerClassName = '',
  titleClassName = '',
  contentClassName = '',
  ...props
}) => {
  const hasHeader = title || subtitle;
  const headerClass = `${styles['header']} ${hasHeader && headerDivider && styles['header--divider']} ${hasHeader && styles['header__content']}`;
  const closeButtonClass = hasHeader ? styles['close'] : '';
  const ref = useRef<HTMLDivElement | null>(null);
  useDetectOutside(ref, onClose);

  return (
    <Slide in={open} direction={direction} mountOnEnter={mountOnEnter} unmountOnExit={unmountOnExit} {...props}>
      <div
        ref={ref}
        className={`${styles['container']} ${containerClassName} ${Capacitor.getPlatform() === 'ios' ? 'pt-6' : ''}`}
        id="slider"
      >
        <div className={headerClass}>
          <div className="flex flex-col">
            {title && <div className={`${styles['title']} ${titleClassName}`}>{title}</div>}
            {subtitle && <span className={styles['subtitle']}>{subtitle}</span>}
          </div>
          {hasHeader ? (
            <CloseButton handleClose={onClose} customStyle={closeButtonClass} />
          ) : (
            <>
              <div className="hidden md:flex">
                <CloseButton handleClose={onClose} customStyle={closeButtonClass} />
              </div>
              <div className="flex md:hidden mt-6 ml-4">
                <BackLink title={translate('general-back')} onBack={onClose} customStyle="!w-fit" />
              </div>
            </>
          )}
        </div>
        <div data-testid="notification-slide" className={`${styles['content']} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </Slide>
  );
};

export default Slider;
