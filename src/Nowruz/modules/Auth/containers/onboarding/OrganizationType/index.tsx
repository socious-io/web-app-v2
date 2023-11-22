import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import SelectCardGroup from 'src/Nowruz/modules/general/components/selectCardGroup';

import css from './organization-type.module.scss';
import { useOrganizationType } from './useOrganizationType';

export const OrganizationType = () => {
  const { orgType, setOrgType, items, goNextPage } = useOrganizationType();
  return (
    <div className="md:pt-3 px-4 flex flex-col">
      <div className="container">
        <div className={css.header}>
          <div>
            <h1 className={css.title}>Create organization</h1>
          </div>
          <div>
            <h2 className={css.description}>Please select the category that best describes your organization</h2>
          </div>
          <SelectCardGroup items={items} value={orgType} setValue={(e) => setOrgType(e)} />
        </div>
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-8 ${css.footer}`}>
        <Button disabled={!orgType} color="primary" block onClick={goNextPage}>
          Next: Social causes
        </Button>
      </div>
    </div>
  );
};
