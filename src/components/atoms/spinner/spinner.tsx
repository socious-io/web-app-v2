import css from './spinner.module.scss';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export function Spinner(): JSX.Element {
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
}
