import { Card } from 'src/components/atoms/card/card';
import { BackLinkProps } from './back-link.types';
import css from './back-link.module.scss';

export const BackLink = (props: BackLinkProps): JSX.Element => {
  function onClick() {
    if (props.onBack) {
      props.onBack();
    } else {
      history.back();
    }
  }

  return (
    <Card className={css.container} onClick={onClick}>
      <img src="/icons/chevron-left.svg" width={16} height={16} />
      <span className={css.title}>{props.title}</span>
    </Card>
  );
};
