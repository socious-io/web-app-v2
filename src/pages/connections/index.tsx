import { useTranslation } from 'react-i18next';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './connections.module.scss';
import { useConnections } from './useConnections';
export const Connctions = () => {
  const { tabs, activeIndex } = useConnections();
  const { t } = useTranslation('communities');
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <h1 className={css.title}>{t('communities_option_connections')}</h1>
          <h2 className={css.subtitle}>{t('your_network')}</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={activeIndex} />
    </div>
  );
};
