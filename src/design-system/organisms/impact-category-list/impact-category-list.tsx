import css from './impact-category-list.module.scss';
import {ImpactCategoryItem} from '../../../../src/design-system/molecules/impact-category-item/impact-category-item';
import {ImpactCategoryListProps} from './impact-category-list.types';
import {
  LIST,
  SDG,
} from '../../../../src/design-system/atoms/impact-badge/impact-badge.constant';

const badges = Object.entries(LIST);

export const ImpactCategoryList = (
  props: ImpactCategoryListProps,
): JSX.Element => {
  const {data, ...rest} = props;
  return (
    <div className={css.container} style={rest}>
      {badges.map(([key]) => {
        const category = key as keyof typeof SDG;
        return <ImpactCategoryItem category={category} key={key} />;
      })}
    </div>
  );
};
