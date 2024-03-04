import { useNavigate } from 'react-router-dom';
import { Applicant } from 'src/core/api';

export const useApplicant = (applicant: Applicant) => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/profile/users/${applicant.user.username}/view`);
  };

  const handleClickResume = () => {
    window.open(applicant.attachment?.url, '_blank', 'rel=noopener noreferrer');
  };

  const questionList = applicant?.answers?.map((a) => {
    const q = applicant.questions?.find((item) => item.id === a.question_id);
    return { id: q?.id, question: q?.question, answer: a?.answer };
  });

  return { handleViewProfile, handleClickResume, questionList };
};
