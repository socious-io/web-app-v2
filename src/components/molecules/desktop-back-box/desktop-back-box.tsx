import css from './desktop-back-box.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { DesktopBackBoxProps } from './desktop-back-box.types';

export const DesktopBackBox = (props: DesktopBackBoxProps) => {
  const { onBack = () => history.back(), label = 'Back' } = props;
  return (
    <Card cursor="pointer" onClick={onBack}>
      <div className={css.back}>
        <img src="/icons/chevron-left.svg" />
        <div>{label}</div>
      </div>
    </Card>
  );
};
