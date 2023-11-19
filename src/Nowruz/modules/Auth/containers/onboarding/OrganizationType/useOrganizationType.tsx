import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

export const useOrganizationType = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();

  const items = [
    { value: 'STARTUP', label: 'Impact Startup' },
    { value: 'SOCIAL', label: 'Social Business' },
    { value: 'NONPROFIT', label: 'Non profit / Charity' },
    { value: 'COOP', label: 'Social Co-operative' },
    { value: 'IIF', label: 'Impact Investing Funds / Foundations' },
    { value: 'PUBLIC', label: 'Public Institution' },
    { value: 'INTERGOV', label: 'Intergovernmental Organization' },
    { value: 'DEPARTMENT', label: 'Impact department for a profit company' },
    { value: 'OTHER', label: 'Other' },
  ];
  const setOrgType = (value) => updateUser({ ...state, orgType: value });

  const goNextPage = () => updateSelectedStep(3);
  return { orgType: state.orgType, items, goNextPage, setOrgType };
};
