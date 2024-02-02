import { useNavigate } from 'react-router-dom';
import { Applicant } from 'src/core/api';

export const useApplicant = (applicant: Applicant) => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/nowruz/profile/users/${applicant.user.username}/view`);
  };

  const handleClickResume = () => {
    window.open(applicant.attachment?.url, '_blank', 'rel=noopener noreferrer');
  };
  return { handleViewProfile, handleClickResume };
};
