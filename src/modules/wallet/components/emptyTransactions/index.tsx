import React from 'react';
import { translate } from 'src/core/utils';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';

export const EmptyTransactions = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col w-full md:w-[352px] h-fit gap-4 items-center">
        <FeaturedIcon type="modern" theme="gray" size="lg" iconName="search-lg" />
        <div className="flex flex-col gap-1 items-center">
          <span className="font-semibold text-base text-Gray-light-mode-900">{translate('pay-no-transaction')}</span>
          <span className="font-normal text-sm text-Gray-light-mode-600 text-center">
            {translate('pay-no-transaction-desc')}
          </span>
        </div>
      </div>
    </div>
  );
};
