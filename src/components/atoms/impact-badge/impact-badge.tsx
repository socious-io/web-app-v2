import css from './impact-badge.module.scss';
import { ImpactBadgeProps } from './impact-badge.types';

export const ImpactBadge = (props: ImpactBadgeProps): JSX.Element => {
  return (
    <div role="button" style={{ backgroundColor: props.color }} className={css.container}>
      <img src={props.iconUrl} />
    </div>
  );
};
