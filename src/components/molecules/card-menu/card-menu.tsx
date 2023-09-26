import { Card } from '../../atoms/card/card';
import { Typography } from '../../atoms/typography/typography';
import css from './card-menu.module.scss';
import { CardMenuProps } from './card-menu.types';

export const CardMenu = (props: CardMenuProps): JSX.Element => {
  const { title, list } = props;

  return (
    <div className={css.container}>
      <Card>
        <div className={css.title}>{title}</div>
        <div className={css.list}>
          {list.map((item) => (
            <div key={item.label} className={css.menuItem} onClick={item.link}>
              <div className={css.icon}>
                <img src={item.icon} />
              </div>
              <Typography>{item.label}</Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
