import { CSSProperties } from 'react';

import { ImpactBadgeProps } from '../../atoms/impact-badge/impact-badge.types';

export interface ImpactCategoryListProps extends CSSProperties {
  activeList: string[];
}
