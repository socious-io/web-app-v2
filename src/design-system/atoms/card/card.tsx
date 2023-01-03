import css from './card.module.scss';
import { CardProps } from './card.types';

export const Card = (props: CardProps): JSX.Element => {
  const { children, onClick, ...rest } = props;
  return (
    <div onClick={onClick} style={rest} className={css.container}>
      {children}
    </div>
  );
};
