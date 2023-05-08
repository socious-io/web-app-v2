import { Card } from 'src/components/atoms/card/card';
import { BackLinkProps } from './back-link.types';
import css from './back-link.module.scss';

export const BackLink: React.FC<BackLinkProps> = ({ title, onBack }) => {
  return (
    <Card className={css.container} onClick={onBack}>
      <img src="/icons/chevron-left.svg" width={16} height={16} />
      <span className={css.title}>{title}</span>
    </Card>
  );
};
