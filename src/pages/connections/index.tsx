import { translate } from 'src/core/utils';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './connections.module.scss';
import { useConnections } from './useConnections';

export const Connections = () => {
  const { tabs, activeIndex } = useConnections();
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <h1 className={css.title}>{translate('connect-title')}</h1>
          <h2 className={css.subtitle}>{translate('connect-network')}</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={activeIndex} />
    </div>
  );
};
