import React from 'react';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';

import styles from './index.module.scss';
import { AlertMessageProps } from './index.types';
import { FeaturedIconOutlined } from '../featuredIconOutlined';

const AlertMessage: React.FC<AlertMessageProps> = ({
  theme,
  iconName,
  title,
  subtitle = '',
  children,
  colOrderMobileView,
  containerClassName = '',
}) => {
  return (
    <div
      className={`${styles['container']} ${styles[`container--${theme}`]} ${colOrderMobileView && 'flex-col md:flex-row'} ${containerClassName}`}
    >
      <FeaturedIconOutlined iconName={iconName} size="md" theme={theme} />
      <div className={styles['header']}>
        <span className={`${styles['title']} ${styles[`title--${theme}`]}`}>{title}</span>
        {subtitle && (
          <span className={`${styles['subtitle']} ${styles[`title--${theme}`]}`}>{convertMarkdownToJSX(subtitle)}</span>
        )}
        {children}
      </div>
    </div>
  );
};

export default AlertMessage;
