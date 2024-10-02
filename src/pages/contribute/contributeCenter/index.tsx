import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './contributeCenter.module.scss';
import { useContributeCenter } from './useContributeCenter';

export const ContributeCenter = () => {
  const { tabs } = useContributeCenter();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <h1 className={css.title}>Disputes Resolution Center</h1>
          <h2 className={css.subtitle}>Manage disputes here.</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} />
    </div>
  );
};
