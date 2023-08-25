import clsx from 'clsx';

import css from './card.module.scss';
import { CardProps } from './card.types';

const Card = (props: CardProps): JSX.Element => {
  const { children, className, onClick } = props;
  return (
    <div onClick={onClick} className={clsx(css.container, className)}>
      {children}
    </div>
  );
};

export default Card;
