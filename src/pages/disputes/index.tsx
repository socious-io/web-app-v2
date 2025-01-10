import { translate } from 'src/core/utils';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './disputes.module.scss';
import { useDisputes } from './useDisputes';

export const Disputes = () => {
  const { tabs, activeTabIndex } = useDisputes();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <h1 className={css.title}>{translate('dispute-title')}</h1>
          <h2 className={css.subtitle}>{translate('dispute-subtitle')}</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={activeTabIndex} />
    </div>
  );
};
