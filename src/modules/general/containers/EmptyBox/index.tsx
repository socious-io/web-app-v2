import { Button } from 'src/modules/general/components/Button';

import css from './index.module.scss';
import { EmptyBoxProps } from './index.types';

const EmptyBox: React.FC<EmptyBoxProps> = ({ icon, title, subtitle = '', button }) => {
  return (
    <div className={css['container']}>
      {icon}
      <div className={css['content']}>
        {title}
        {subtitle && <span className={css['content__subtitle']}>{subtitle}</span>}
      </div>
      {button && <Button {...button} />}
    </div>
  );
};

export default EmptyBox;
