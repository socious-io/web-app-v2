import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
export const useOrganizationType = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const { t } = useTranslation('educationalcertificate');
  const items = [
    { value: 'STARTUP', label: t('impactStartupOption') },
    { value: 'SOCIAL', label: t('socialBusinessOption') },
    { value: 'NONPROFIT', label: t('nonProfitOption') },
    { value: 'COOP', label: t('socialCooperativeOption') },
    { value: 'IIF', label: t('impactInvestingFundOption') },
    { value: 'PUBLIC', label: t('publicInstitutionOption') },
    { value: 'INTERGOV', label: t('intergovernmentalOrganizationOption') },
    { value: 'EDUCATIONAL', label: t('educationalInstitutionOption') },
    { value: 'HEALTHCARE', label: t('healthcareOrganizationOption') },
    { value: 'RELIGIOUS', label: t('religiousOrganizationOption') },
    { value: 'COMMERCIAL', label: t('commercialEnterprisesOption') },
    { value: 'DEPARTMENT', label: t('impactDepartmentOption') },
    { value: 'OTHER', label: t('otherOption') },
  ];
  const setOrgType = value => updateUser({ ...state, orgType: value });

  const goNextPage = () => updateSelectedStep(3);
  return { orgType: state.orgType, items, goNextPage, setOrgType };
};
