import Card from '@atoms/card';

import css from './desktop-back-box.module.scss';
import { DesktopBackBoxProps } from './desktop-back-box.types';

export const DesktopBackBox = (props: DesktopBackBoxProps) => {
  const { onBack = () => history.back(), label = 'Back' } = props;
  return (
    <Card onClick={onBack} className="cursor-pointer">
      <div className={css.back}>
        <img src="/icons/chevron-left.svg" />
        <div>{label}</div>
      </div>
    </Card>
  );
};
