import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Applicant } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';

import { ApplicantDetails } from './applicant';
import { useApplicantAction } from './useApplicantAction';

interface CardsProps {
  applicants: Array<Applicant>;
}

export const Cards: React.FC<CardsProps> = ({ applicants }) => {
  const { open, setOpen, applicant, onClickName } = useApplicantAction(applicants);

  return (
    <div className="flex flex-col gap-4">
      {applicants.map((applicant) => (
        <div key={applicant.id} className="border border-solid border-Gray-light-mode-200 rounded-lg">
          <div
            className="flex flex-row justify-start items-center gap-2 p-4 cursor-pointer"
            onClick={() => onClickName(applicant.user.id)}
          >
            <Avatar size="40px" type="users" img={applicant.user.avatar} />
            <div className="flex flex-col justify-start">
              <p className="text-Gray-light-mode-900 leading-6 font-medium">{applicant.user?.name ?? ''}</p>
              <p className="text-Gray-light-mode-600 text-sm leading-5">
                {toRelativeTime(applicant.created_at.toString())}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-1 p-4">
            <Icon name="marker-pin-01" fontSize={20} color={variables.color_grey_600} />
            <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm">{`${applicant.user.city}, ${applicant.user.country}`}</p>
          </div>
          <div className="flex flex-row border-Gray-light-mode-200 border-solid border-b-0 border-t-1 border-l-0 border-r-0">
            <div className="w-1/2 border-Gray-light-mode-200 border-solid border-b-0 border-t-0 border-l-0 border-r text-center">
              <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                Reject
              </p>
            </div>
            <div className="w-1/2 text-center">
              <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                Hire
              </p>
            </div>
          </div>
        </div>
      ))}
      <Overlay open={open} onClose={() => setOpen(false)}>
        <ApplicantDetails applicant={applicant} />
      </Overlay>
    </div>
  );
};
