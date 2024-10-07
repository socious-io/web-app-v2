import { Dot } from 'src/modules/general/components/dot';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { StepProps } from './index.types';

const Step: React.FC<StepProps> = ({ title, subtitle, displayDivider }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['dots']}>
        <div className={styles['dots__icon']}>
          <Dot size="small" color={variables.color_grey_200} shadow={false} />
        </div>
        {displayDivider && <div className={styles['dots__divider']} />}
      </div>
      <div className={styles['texts']}>
        <span className={styles['texts__title']}>{title}</span>
        {subtitle}
      </div>
    </div>
  );
};

export default Step;
