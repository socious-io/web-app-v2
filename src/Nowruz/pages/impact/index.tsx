import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { RootState } from 'src/store';

import css from './impact.module.scss';
import { useImpact } from './useImpact';

export const Impact = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const navigate = useNavigate();
  const user = currentIdentity?.meta as UserMeta;

  const {
    data: { tabs },
  } = useImpact();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <BackLink
          title="Back to my profile"
          onBack={() => navigate(`/nowruz/profile/users/${user.username}/view`)}
          customStyle="w-fit"
        />
        <h1 className={css.title}>My impact</h1>
      </div>

      <div>
        <HorizontalTabs tabs={tabs} />
      </div>
    </div>
  );
};
