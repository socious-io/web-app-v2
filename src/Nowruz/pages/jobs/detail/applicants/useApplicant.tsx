import { useNavigate } from 'react-router-dom';
import { Applicant } from 'src/core/api';

export const useApplicant = (applicant: Applicant, openReject: () => void, closeDetails: () => void) => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/profile/users/${applicant.user.username}/view`);
  };

  const handleClickResume = () => {
    window.open(applicant.attachment?.url, '_blank', 'rel=noopener noreferrer');
  };

  const questionList = applicant?.answers?.map(a => {
    const q = applicant.questions?.find(item => item.id === a.question_id);
    return { id: q?.id, question: q?.question, answer: a?.answer };
  });

  const handleReject = () => {
    openReject();
    closeDetails();
  };

  const handleMessage = () => {
    navigate(`/chats?participantId=${applicant.user.id}`);
  };
  return { handleViewProfile, handleClickResume, questionList, handleReject, handleMessage };
};
