import { useContext } from 'react';
import { Button } from 'src/modules/general/components/Button';

import styles from './index.module.scss';
import { StepsContext } from '../Stepper';

const Experiences = () => {
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <div className={styles['main']}>
      <div className={styles['main__content']}>
        <div className={styles['main__header']}>
          <span className={styles['main__title']}>Career milestones matter</span>
          Ensure all roles and key achievements are included. A complete career profile boosts your job prospects.
        </div>
        <div className={styles['main__body']}>experiences</div>
      </div>
      <Button type="button" variant="contained" color="primary" fullWidth onClick={() => updateSelectedStep(3)}>
        Next: Education
      </Button>
    </div>
  );
};

export default Experiences;
