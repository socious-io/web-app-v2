import { useLoaderData } from 'react-router-dom';

export const useJobDetail = () => {
  const { jobDetail, screeningQuestions } = useLoaderData();
};
