import React from 'react';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { useTranslation } from 'react-i18next';

export const EmptyTransactions = () => {
  const { t } = useTranslation('payments');
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col w-full md:w-[352px] h-fit gap-4 items-center">
        <FeaturedIcon type="modern" theme="gray" size="lg" iconName="search-lg" />
        <div className="flex flex-col gap-1 items-center">
          <span className="font-semibold text-base text-Gray-light-mode-900">{t('Payments_NoTransactionsFound')}</span>
          <span className="font-normal text-sm text-Gray-light-mode-600 text-center">
            {t('Payments_NoTransactionsText')}
          </span>
        </div>
      </div>
    </div>
  );
};
