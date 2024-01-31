import { useState } from 'react';
import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { Modal } from 'src/components/templates/modal/modal';
import { isTouchDevice } from 'src/core/device-type-detector';
import { BadgeDetailSlide } from 'src/pages/achievements/components/badge-detail-slide/badge-detail-slide';

import css from './impact-category-list.module.scss';
import { ImpactCategoryListProps } from './impact-category-list.types';
import { BADGES, Badges } from '../../../constants/constants';
import { ImpactCategoryItem } from '../../molecules/impact-category-item/impact-category-item';

export const ImpactCategoryList = (props: ImpactCategoryListProps): JSX.Element => {
  const { activeList, ...rest } = props;
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState();

  function isActive(name: string) {
    return activeList.includes(name);
  }

  const slideUpJSX = (
    <CardSlideUp open={popupVisibility} onClose={() => setPopupVisibility(false)}>
      <div style={{ minHeight: '80vh' }}>
        <BadgeDetailSlide id={selectedBadge} />
      </div>
    </CardSlideUp>
  );

  const modalJSX = (
    <Modal width="25rem" maxHeight="70vh" open={popupVisibility} onClose={() => setPopupVisibility(false)}>
      <BadgeDetailSlide id={selectedBadge} />
    </Modal>
  );

  function onImpactClick(impact: Badges) {
    setSelectedBadge(impact.value);
    setPopupVisibility(true);
  }

  return (
    <div className={css.container} style={rest}>
      {isTouchDevice() ? slideUpJSX : modalJSX}
      {Object.entries(BADGES).map((badge) => {
        const b = badge[1];
        return (
          <div key={b.value} style={{ opacity: isActive(b.value) ? '1' : '0.5' }}>
            <ImpactCategoryItem
              iconUrl={`/sdg/${b.value}.svg`}
              key={b.value}
              color={b.color}
              label={b.label}
              onClick={() => onImpactClick(b)}
            />
          </div>
        );
      })}
    </div>
  );
};
