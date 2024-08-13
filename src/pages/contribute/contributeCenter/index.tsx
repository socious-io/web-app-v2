import { useTranslation } from 'react-i18next';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './contributeCenter.module.scss';
import { useContributeCenter } from './useContributeCenter';

export const ContributeCenter = () => {
  const { tabs } = useContributeCenter();
  const { t } = useTranslation('decentdispute');
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <h1 className={css.title}>{t('DecDispDisputeResolutionCenter')}</h1>
          <h2 className={css.subtitle}>{t('DecDispManageDisputes')}</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={0} />
    </div>
  );
};
