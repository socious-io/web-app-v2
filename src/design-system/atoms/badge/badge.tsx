import css from './badge.module.scss';
import { BadgeProps } from './badge.types';

export const Badge = (props: BadgeProps): JSX.Element => {
  return <div className={css.container}>{props.value}</div>;
};
