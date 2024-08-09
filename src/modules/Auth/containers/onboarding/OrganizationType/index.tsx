import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import SelectCardGroup from 'src/modules/general/components/selectCardGroup';

import css from './organization-type.module.scss';
import { useOrganizationType } from './useOrganizationType';

export const OrganizationType = () => {
  const { orgType, setOrgType, items, goNextPage } = useOrganizationType();
  const { t } = useTranslation('educationalcertificate');
  return (
    <div className={`md:pt-3 px-4 flex flex-col ${css.container}`}>
      <div className="mb-6">
        <div className={css.header}>
          <div>
            <h1 className={css.title}>{t('createOrganizationButtonLabel')}</h1>
          </div>
          <div>
            <h2 className={css.description}>{t('organizationCategoryPrompt')}</h2>
          </div>
          <SelectCardGroup items={items} value={orgType} setValue={e => setOrgType(e)} />
        </div>
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-8 ${css.footer}`}>
        <Button disabled={!orgType} color="primary" block onClick={goNextPage}>
          {t('nextStepSocialCausesText')}
        </Button>
      </div>
    </div>
  );
};
