import { useLoaderData } from 'react-router-dom';
import { CredentialExperienceRes } from 'src/core/api';

export const useIssued = () => {
  const { credentials } = useLoaderData() as { credentials: CredentialExperienceRes[] };

  return { credentials };
};
