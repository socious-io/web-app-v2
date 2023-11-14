import React from 'react';
import { Input } from 'src/Nowruz/general/input/input';

import css from './create-organization.module.scss';

export const CreateOrganization = () => {
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className={css.header}>
        <div className={css.title}>
          <h1>Create organization</h1>
        </div>
        <div className={css.description}>
          <h2>Enter your organization name</h2>
        </div>
      </div>
      <Input
        value={bio}
        label="Headline"
        customHeight="128px"
        variant="outlined"
        placeholder="eg."
        multiline
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};
