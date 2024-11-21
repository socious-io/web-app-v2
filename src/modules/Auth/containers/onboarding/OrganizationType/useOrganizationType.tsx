import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
export const useOrganizationType = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const { t: translate } = useTranslation();
  const items = [
    { value: 'STARTUP', label: translate('org-type-startup') },
    { value: 'SOCIAL', label: translate('org-type-social') },
    { value: 'NONPROFIT', label: translate('org-type-non-profit') },
    { value: 'COOP', label: translate('org-type-social-cooperative') },
    { value: 'IIF', label: translate('org-type-iif') },
    { value: 'PUBLIC', label: translate('org-type-public') },
    { value: 'INTERGOV', label: translate('org-type-inter-gov') },
    { value: 'EDUCATIONAL', label: translate('org-type-edu') },
    { value: 'HEALTHCARE', label: translate('org-type-health-care') },
    { value: 'RELIGIOUS', label: translate('org-type-religious') },
    { value: 'COMMERCIAL', label: translate('org-type-commercial') },
    { value: 'DEPARTMENT', label: translate('org-type-department') },
    { value: 'OTHER', label: translate('org-type-other') },
  ];
  const setOrgType = value => updateUser({ ...state, orgType: value });

  const goNextPage = () => updateSelectedStep(3);
  return { orgType: state.orgType, items, goNextPage, setOrgType, translate };
};
