import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import css from './spinner.module.scss';

export const Spinner = () => {
  const spinnerVisibility = useSelector<RootState>((state) => state.spinner);
  return (
    <div
      className={css.container}
      style={{
        opacity: spinnerVisibility ? 1 : 0,
      }}
    >
      <LinearProgress />
    </div>
  );
};
