import { CredentialList  } from 'src/Nowruz/modules/credentials/credentialsList';

export const useCredentialsList = () => {
  const tabs = [
    { label: 'Requested', content: <CredentialList /> },
    { label: 'Issued', content: 'Issued Tab' },
  ];
  return { tabs };
};
