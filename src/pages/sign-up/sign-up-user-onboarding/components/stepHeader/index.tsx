import React from 'react';
import css from './stepHeader.module.scss';

interface Props {
  title: string;
  subTitle: string;
  className?: string;
}
const StepHeader: React.FC<Props> = ({ title, subTitle, className }) => {
  return (
    <div className={`${css['container']} ${className}`}>
      {title && <div className={css['title']}>{title}</div>}
      {subTitle && <div className={css['sub-title']}>{subTitle}</div>}
    </div>
  );
};

export default StepHeader;
