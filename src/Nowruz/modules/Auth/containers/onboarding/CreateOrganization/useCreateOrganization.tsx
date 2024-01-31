import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

export const useCreateOrganization = () => {
  const { state, updateUser } = useUser();

  const { updateSelectedStep } = useContext(StepsContext);
  const updateOrgName = (orgName: string) => updateUser({ ...state, orgName });

  const goNextPage = () => updateSelectedStep(2);
  const isValidForm = state.orgName.length;
  return { goNextPage, orgName: state.orgName, updateOrgName, isValidForm };
};
