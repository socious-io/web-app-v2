import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';

import css from './termsConditions.module.scss';

export const TermsConditions = () => {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={() => navigate(-1)}>
          <Icon name="chevron-left" fontSize={32} />
        </div>
      </div>
      <span>{translate('terms-introduction')}</span>
      <strong>{translate('terms-article1-title')}</strong>
      <span>{translate('terms-article1-content')}</span>
      <strong>{translate('terms-article2-title')}</strong>
      <span>{translate('terms-article2-content')}</span>
      <strong>{translate('terms-article3-title')}</strong>
      <span>{translate('terms-article3-content')}</span>
      <strong>{translate('terms-article4-title')}</strong>
      <span>{translate('terms-article4-content')}</span>
      <strong>{translate('terms-article5-title')}</strong>
      <span>{translate('terms-article5-content')}</span>
      <strong>{translate('terms-article6-title')}</strong>
      <span>{translate('terms-article6-content')}</span>
      <strong>{translate('terms-article7-title')}</strong>
      <span>{translate('terms-article7-content')}</span>
      <strong>{translate('terms-article8-title')}</strong>
      <span>{translate('terms-article8-content')}</span>
      <strong>{translate('terms-article9-title')}</strong>
      <span>{translate('terms-article9-content')}</span>
      <strong>{translate('terms-article10-title')}</strong>
      <span>{translate('terms-article10-content')}</span>
      <strong>{translate('terms-article11-title')}</strong>
      <span>{translate('terms-article11-content')}</span>
      <strong>{translate('terms-article12-title')}</strong>
      <span>{translate('terms-article12-content')}</span>
      <strong>{translate('terms-article13-title')}</strong>
      <span>{translate('terms-article13-content')}</span>
      <strong>{translate('terms-article14-title')}</strong>
      <span>{translate('terms-article14-content')}</span>
      <strong>{translate('terms-article15-title')}</strong>
      <span>{translate('terms-article15-content')}</span>
      <strong>{translate('terms-article16-title')}</strong>
      <span>{translate('terms-article16-content')}</span>
    </div>
  );
};
