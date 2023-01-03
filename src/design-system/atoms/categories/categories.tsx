import css from './categories.module.scss';
import { CategoriesProps } from './categories.types';

export const Categories = (props: CategoriesProps): JSX.Element => {
  const { list, ...rest } = props;

  return (
    <div style={rest} className={css.container}>
      {list.map((item) => (
        <div key={item} className={css.item}>{item}</div>
      ))}
    </div>
  );
};
