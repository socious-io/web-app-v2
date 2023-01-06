import css from './organization-create-type.module.scss';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import { Button } from '../../../atoms/button/button';
import { TypeSelector } from '../../../atoms/type-selector/type-selector';
import { useNavigate } from '@tanstack/react-location';
import { ORGANIZATION_TYPE } from './organization-create-type.services';

export const OrganizationCreateType = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <BottomStatic>
        <div>
          <div className={css.question}>What type of organization?</div>
          <div>
            <TypeSelector
              padding="2rem 1rem"
              onChange={console.log}
              list={ORGANIZATION_TYPE}
            />
          </div>
        </div>
        <div className={css.bottom}>
          <Button onClick={() => navigate({ to: '../social-causes' })}>
            Continue
          </Button>
        </div>
      </BottomStatic>
    </div>
  );
};
