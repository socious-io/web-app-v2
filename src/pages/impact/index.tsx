import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { BackLink } from 'src/modules/general/components/BackLink';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { RootState } from 'src/store';

import css from './impact.module.scss';
import { useImpact } from './useImpact';

export const Impact = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const navigate = useNavigate();
  const user = currentIdentity?.meta as UserMeta;

  const {
    data: { tabs },
  } = useImpact();
  const { t } = useTranslation('impact');
  return (
    <div className={css.container}>
      <div className={css.header}>
        <BackLink
          title={t('action.back_to_profile')}
          onBack={() => navigate(`/profile/users/${user.username}/view`)}
          customStyle="w-fit"
        />
        <h1 className={css.title}>{t('heading.my_impact')}</h1>
      </div>

      <div>
        <HorizontalTabs tabs={tabs} />
      </div>
    </div>
  );
};
