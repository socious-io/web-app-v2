import css from './impact-category-item.module.scss';
import {ImpactBadge} from '../../../../src/design-system/atoms/impact-badge/impact-badge';
import {ImpactBar} from '../../../../src/design-system/atoms/impact-bar/impact-bar';
import {Typography} from '../../../../src/design-system/atoms/typography/typography';
import {ImpactCategoryItemProps} from './impact-category-item.types';
import {LIST} from '../../../../src/design-system/atoms/impact-badge/impact-badge.constant';

export const ImpactCategoryItem = ({
  category,
}: ImpactCategoryItemProps): JSX.Element => {
  return (
    <div className={css.container}>
      <ImpactBadge name={category} />
      {/* <div className={css.impactBarContainer}>
        <ImpactBar start={0} end={100} current={50} />
      </div> */}
      <Typography className={css.label} type="body" size="s">
        {LIST[category].name}
      </Typography>
    </div>
  );
};
