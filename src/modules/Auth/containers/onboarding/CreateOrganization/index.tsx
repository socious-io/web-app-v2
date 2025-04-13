import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import css from './create-organization.module.scss';
import { useCreateOrganization } from './useCreateOrganization';

export const CreateOrganization = () => {
  const { t: translate } = useTranslation();
  const { goNextPage, orgName, updateOrgName, isValidForm } = useCreateOrganization();
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className="container">
        <div className={css.header}>
          <div>
            <h1 className={css.title}>{translate('onboarding-create-org')}</h1>
          </div>
          <div>
            <h2 className={css.description}>{translate('onboarding-create-org-name')}</h2>
          </div>
        </div>
        <Input
          data-testid="org-name-input"
          id="name"
          value={orgName}
          label={translate('onboarding-org-name')}
          placeholder={translate('onboarding-org-name-placeholder')}
          onChange={e => updateOrgName(e.target.value)}
        />
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-44 ${css.footer}`}>
        <Button data-testid="continue-button" disabled={!isValidForm} color="primary" block onClick={goNextPage}>
          {translate('onboarding-next-org-type')}
        </Button>
      </div>
    </div>
  );
};
