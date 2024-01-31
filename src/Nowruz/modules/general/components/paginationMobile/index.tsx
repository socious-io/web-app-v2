import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './paginationMobile.module.scss';
import { PaginationMobileProps } from './paginationMobile.types';

export const PaginationMobile: React.FC<PaginationMobileProps> = ({ page, handleChange, count }) => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <button className={`${css.mobileBtn} ml-0 mr-auto`} onClick={() => handleChange(page - 1)} disabled={page === 1}>
        <Icon name="arrow-left" fontSize={20} className="text-Gray-light-mode-700" />
      </button>
      <span className={css.mobilePageLabel}>{`page ${page} of ${count}`}</span>
      <button
        className={`${css.mobileBtn} mr-0 ml-auto`}
        onClick={() => handleChange(page + 1)}
        disabled={page === count}
      >
        <Icon name="arrow-right" fontSize={20} className="text-Gray-light-mode-700" />
      </button>
    </div>
  );
};
