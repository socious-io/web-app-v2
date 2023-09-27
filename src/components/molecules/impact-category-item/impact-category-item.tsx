import css from './impact-category-item.module.scss';
import { ImpactCategoryItemProps } from './impact-category-item.types';
import { ImpactBadge } from '../../atoms/impact-badge/impact-badge';
import { ImpactBar } from '../../atoms/impact-bar/impact-bar';
import { Typography } from '../../atoms/typography/typography';

export const ImpactCategoryItem = (props: ImpactCategoryItemProps): JSX.Element => {
  return (
    <div className={css.container} onClick={props.onClick}>
      <ImpactBadge color={props.color} iconUrl={props.iconUrl} />
      {/* <div className={css.impactBarContainer}>
        <ImpactBar start={0} end={100} current={50} />
      </div> */}
      <div className={css.label}>{props.label}</div>
    </div>
  );
};
