import css from './categories.module.scss';
import { CategoriesProps } from './categories.types';

export const Categories = (props: CategoriesProps): JSX.Element => {
  const { list, ...rest } = props;

  return (
    // TODO: refactor key=i to use non-index for key
    <div style={rest} className={css.container}>
      {list.map((item, i) => (
        <div key={i} className={css.item}>
          {item}
        </div>
      ))}
    </div>
  );
};
