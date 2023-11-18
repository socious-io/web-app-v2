import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import SelectCardGroup from 'src/Nowruz/modules/general/components/selectCardGroup';

import css from './organization-type.module.scss';
import { useOrganizationType } from './useOrganizationType';

export const OrganizationType = () => {
  const { orgType, setOrgType, items, goNextPage } = useOrganizationType();
  return (
    <div className="md:pt-9 px-4 flex flex-col">
      <div className="container">
        <div className={css.header}>
          <div className={css.title}>
            <h1>Create organization</h1>
          </div>
          <div className={css.description}>
            <h2>What type is your organization?</h2>
          </div>
          <SelectCardGroup items={items} value={orgType} setValue={(e) => setOrgType(e)} />
        </div>
      </div>
      <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-8 ">
        <Button disabled={!orgType} color="primary" block onClick={goNextPage}>
          Next: Social causes
        </Button>
      </div>
    </div>
  );
};
