import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ProgressStepProps } from './index.types';
import { Dot } from '../dot';
import { Icon } from '../Icon';

const ProgressStep: React.FC<ProgressStepProps> = props => {
  const { count, active = 0, titles = [], containerClassName = '' } = props;

  const renderIcon = (index: number) => {
    if (index < active) {
      return (
        <div className={styles['icon']}>
          <Icon name="tick" fontSize={12} color={variables.color_primary_600} />
        </div>
      );
    } else {
      return (
        <div className={`${styles['icon']} ${index === active ? styles['icon--active'] : styles['icon--inactive']}`}>
          <Dot
            size="small"
            color={index === active ? variables.color_primary_600 : variables.color_grey_200}
            shadow={false}
          />
        </div>
      );
    }
  };

  return (
    <div className={`${styles['container']} ${containerClassName}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles['progress']}>
          <div className={styles['step']}>
            <div
              className={`${styles['indicator']} ${styles['indicator__before']} ${index === 0 && 'invisible'} ${index <= active && styles['indicator--active']}`}
            />
            {renderIcon(index)}
            <div
              className={`${styles['indicator']} ${index === count - 1 && 'invisible'} ${index < active && styles['indicator--active']}`}
            />
          </div>
          <span className={`${styles['title']} ${index === active && styles['title--active']}`}>{titles[index]}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressStep;
