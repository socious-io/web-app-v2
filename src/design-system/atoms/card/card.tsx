import css from './card.module.scss';
import { CardProps } from './card.types';

export const Card = (props: CardProps): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <div style={rest} className={css.container}>
      {children}
    </div>
  );
};
