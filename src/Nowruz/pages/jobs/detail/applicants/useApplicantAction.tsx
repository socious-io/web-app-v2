import { useState } from 'react';
import { Applicant } from 'src/core/api';

export const useApplicantAction = (applicants: Array<Applicant>) => {
  const [open, setOpen] = useState(false);
  const [applicant, setApplicant] = useState({} as Applicant);

  const onClickName = (id: string) => {
    const details = applicants.find((applicant) => applicant.user.id === id);
    setOpen(true);
    setApplicant(details as Applicant);
  };
  return {
    open,
    setOpen,
    applicant,
    setApplicant,
    onClickName,
  };
};
