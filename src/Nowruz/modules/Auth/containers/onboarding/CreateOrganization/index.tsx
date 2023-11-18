import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './create-organization.module.scss';
import { useCreateOrganization } from './useCreateOrganization';

export const CreateOrganization = () => {
  const { goNextPage, orgName, updateOrgName, isValidForm } = useCreateOrganization();
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className="container">
        <div className={css.header}>
          <div className={css.title}>
            <h1>Create organization</h1>
          </div>
          <div className={css.description}>
            <h2>Enter your organization name</h2>
          </div>
        </div>
        <Input
          value={orgName}
          label="Your organization name*"
          variant="outlined"
          placeholder="Enter your organization name"
          onChange={(e) => updateOrgName(e.target.value)}
        />
      </div>
      <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-44 ">
        <Button disabled={!!!isValidForm} color="primary" block onClick={goNextPage}>
          Next: Organization type
        </Button>
      </div>
    </div>
  );
};
