import css from './categories-clickable.module.scss';
import { CategoriesClickableProps } from './categories-clickable.types';

export const CategoriesClickable = (props: CategoriesClickableProps): JSX.Element => {
  const { list, ...rest } = props;

  return (
    <div style={rest} className={css.container}>
      {list.map((item) => (
        <div key={item} className={css.item}>{item}</div>
      ))}
    </div>
  );
};
