import { translate } from 'src/core/utils';

import styles from './index.module.scss';
import { LinkedInButtonProps } from './index.types';

const LinkedInButton: React.FC<LinkedInButtonProps> = ({ handleClick, disabled }) => {
  return (
    <button className={styles['btn']} onClick={handleClick} disabled={disabled}>
      <img src="/icons/nowruz/linkedin.svg" alt="LinkedIn Logo" />
      {translate('linkedin-import-button')}
    </button>
  );
};

export default LinkedInButton;
