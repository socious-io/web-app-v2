import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { RateProps } from './index.types';

const Rate: React.FC<RateProps> = ({ total, rate, icon }) => {
  const { name = 'star-filled', size = 20, color = variables.color_warning_400 } = icon || {};
  return (
    <div className={styles['container']}>
      {Array.from({ length: total }).map((_, index) => (
        <Icon
          key={index}
          name={name}
          fontSize={size}
          color={index + 1 <= Math.round(rate) ? color : variables.color_grey_300}
        />
      ))}
    </div>
  );
};

export default Rate;
