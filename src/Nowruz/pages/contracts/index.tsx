import { ButtonGroups } from 'src/Nowruz/modules/general/components/ButtonGroups';

import css from './contracts.module.scss';
import { useContracts } from './useContracts';

export const Contracts = () => {
  const {
    data: { tabs },
  } = useContracts();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <h1 className={css.title}>Contracts</h1>
          <h2 className={css.subtitle}>Manage your jobs offers and work.</h2>
        </div>
        <div className={css.right}></div>
      </div>
      <ButtonGroups tabs={tabs} />
    </div>
  );
};
