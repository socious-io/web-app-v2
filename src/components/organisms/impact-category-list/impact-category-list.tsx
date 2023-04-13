import css from './impact-category-list.module.scss';
import { ImpactCategoryItem } from '../../molecules/impact-category-item/impact-category-item';
import { ImpactCategoryListProps } from './impact-category-list.types';
import { BADGES } from '../../../constants/constants';

export const ImpactCategoryList = (props: ImpactCategoryListProps): JSX.Element => {
  const { activeList, ...rest } = props;

  function isActive(name: string) {
    return activeList.includes(name);
  }

  return (
    <div className={css.container} style={rest}>
      {Object.entries(BADGES).map((badge) => {
        const b = badge[1];
        return (
          <div key={b.value} style={{ opacity: isActive(b.value) ? '1' : '0.5' }}>
            <ImpactCategoryItem
              iconUrl={`/sdg/${b.value}.svg`}
              key={b.value}
              color={b.color}
              label={b.label}
            />
          </div>
        );
      })}
    </div>
  );
};
