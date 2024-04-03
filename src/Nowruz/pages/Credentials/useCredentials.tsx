import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CredentialList } from 'src/Nowruz/modules/credentials/credentialsList';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useCredentials = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );

  console.log('test log currentIdentity', currentIdentity);
  const [openVerifiyAlert, setOpenVerifiyAlert] = useState(false);
  const verified = (currentIdentity?.meta as OrgMeta).verified;
  const tabs = [{ label: 'Requested', content: <CredentialList /> }];
  return { tabs, verified, openVerifiyAlert, setOpenVerifiyAlert };
};
