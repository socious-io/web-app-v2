import { useLoaderData, useNavigate } from 'react-router-dom';
import { CredentialExperienceRes } from 'src/core/api';

export const useCredentials = () => {
  const { credentials } = useLoaderData() as { credentials: CredentialExperienceRes[] };

  return { credentials };
};
