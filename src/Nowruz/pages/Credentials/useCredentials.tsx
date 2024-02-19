import { CredentialList  } from 'src/Nowruz/modules/credentials/credentialsList';

export const useCredentials = () => {
  const tabs = [
    { label: 'Requested', content: <CredentialList /> },
  ];
  return { tabs };
};
