import { Applicant } from 'src/core/api';

export const useApplicant = (applicant: Applicant) => {
  const handleHire = () => {
    console.log('Hire');
  };
  const handleReject = () => {
    console.log('Reject');
  };

  const handleViewProfile = () => {
    console.log('View');
  };

  const handleClickResume = () => {
    window.open(applicant.attachment?.url, '_blank', 'rel=noopener noreferrer');
  };
  return { handleHire, handleReject, handleViewProfile, handleClickResume };
};
