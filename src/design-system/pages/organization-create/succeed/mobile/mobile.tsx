import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  const organizationName = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.organizationName;
  });

  return (
    <div className={css.container}>
      <div className={css.imgContainer}>
        <div className={css.img}></div>
      </div>
      <div className={css.statement}>
        <div className={css.primary}>Organization created</div>
        <div className={css.secondary}>You have successfully created an organization page!</div>
      </div>
      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../verified' })}>Continue</Button>
      </div>
    </div>
  );
};
