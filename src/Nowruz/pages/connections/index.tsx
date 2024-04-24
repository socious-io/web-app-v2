import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import css from './connections.module.scss';
import { useConnections } from './useConnections';

export const Connctions = () => {
  const { tabs, activeIndex } = useConnections();
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <h1 className={css.title}>Connections</h1>
          <h2 className={css.subtitle}>Your network</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={activeIndex} />
    </div>
  );
};
