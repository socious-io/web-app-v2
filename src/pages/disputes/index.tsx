import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import css from './disputes.module.scss';
import { useDisputes } from './useDisputes';

export const Disputes = () => {
  const { tabs } = useDisputes();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <h1 className={css.title}>Disputes</h1>
          <h2 className={css.subtitle}>Manage your disputes here.</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} activeIndex={0} />
    </div>
  );
};
