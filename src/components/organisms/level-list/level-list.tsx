import css from './level-list.module.scss';
import {LevelItem} from '../../molecules/level-item/level-item';
import {LevelListProps} from './level-list.types';

const LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const LevelList = (props: LevelListProps): JSX.Element => {
  const {data, ...rest} = props;
  return (
    <div className={css.container} style={rest}>
      {LIST.map((level) => (
        <LevelItem level={level} key={level} />
      ))}
    </div>
  );
};
