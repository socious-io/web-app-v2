import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import css from './create-organization.module.scss';
import { useCreateOrganization } from './useCreateOrganization';

export const CreateOrganization = () => {
  const { t } = useTranslation('educationalcertificate');
  const { goNextPage, orgName, updateOrgName, isValidForm } = useCreateOrganization();
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className="container">
        <div className={css.header}>
          <div>
            <h1 className={css.title}>{t('createOrganizationButtonLabel')}</h1>
          </div>
          <div>
            <h2 className={css.description}>{t('organizationNamePrompt')}</h2>
          </div>
        </div>
        <Input
          id="name"
          value={orgName}
          label={t('organizationNameLabel')}
          placeholder={t('organizationNamePrompt')}
          onChange={e => updateOrgName(e.target.value)}
        />
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-44 ${css.footer}`}>
        <Button disabled={!isValidForm} color="primary" block onClick={goNextPage}>
          {t('nextStepOrganizationTypeText')}
        </Button>
      </div>
    </div>
  );
};
