import { useNavigate } from '@tanstack/react-location';
import { useDispatch, useSelector } from 'react-redux';
import { ORGANIZATION_TYPE } from '../../../../../core/constants/ORGANIZATION_TYPE';
import { setOrgType } from '../../../../../store/reducers/createOrgWizard.reducer';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { Steps } from '../../../../atoms/steps/steps';
import { TypeSelector } from '../../../../atoms/type-selector/type-selector';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.type;
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../intro' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={1} />
        </div>
      </div>
      <div className={css.question}>What type of organization?</div>
      <div className={css.main}>
        <TypeSelector
          value={type}
          padding="2rem 1rem"
          onChange={(value) => dispatch(setOrgType(value))}
          list={ORGANIZATION_TYPE}
        />
      </div>
      <div className={css.bottom}>
        <Button disabled={!type} onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
      </div>
    </div>
  );
};
